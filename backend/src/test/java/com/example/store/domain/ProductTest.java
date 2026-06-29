package com.example.store.domain;

import static com.example.store.domain.ProductCategoryTestSamples.*;
import static com.example.store.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.example.store.web.rest.TestUtil;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

class ProductTest {

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    // Verifica la logica de igualdad de Product: dos productos son iguales cuando
    // comparten el mismo id, y distintos cuando no tienen id o tienen ids diferentes.
    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = getProductSample1();
        Product product2 = new Product();
        assertThat(product1).isNotEqualTo(product2);

        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);

        product2 = getProductSample2();
        assertThat(product1).isNotEqualTo(product2);
    }

    // Verifica la relacion Product -> ProductCategory: permite asignar una categoria,
    // recuperarla desde el producto y luego quitarla dejandola en null.
    @Test
    void categoryTest() {
        Product product = getProductRandomSampleGenerator();
        ProductCategory productCategoryBack = getProductCategoryRandomSampleGenerator();

        product.setCategory(productCategoryBack);
        assertThat(product.getCategory()).isEqualTo(productCategoryBack);

        product.category(null);
        assertThat(product.getCategory()).isNull();
    }

    // Verifica que un producto con los campos de negocio obligatorios y validos
    // pase las validaciones Jakarta sin errores.
    @Test
    void shouldAcceptProductWithRequiredBusinessFields() {
        Product product = validProduct();

        assertThat(validator.validate(product)).isEmpty();
    }

    // Verifica que las reglas de negocio rechacen un producto invalido:
    // nombre demasiado corto, precio negativo y stock negativo.
    @Test
    void shouldRejectInvalidProductBusinessFields() {
        Product product = validProduct().name("A").price(new BigDecimal("-0.01")).stock(-1);

        assertThat(validator.validate(product))
            .extracting(violation -> violation.getPropertyPath().toString())
            .contains("name", "price", "stock");
    }

    private static Product validProduct() {
        return new Product().name("Notebook").price(new BigDecimal("1200.00")).stock(8);
    }
}
