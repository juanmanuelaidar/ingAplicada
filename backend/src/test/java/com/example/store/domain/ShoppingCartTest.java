package com.example.store.domain;

import static com.example.store.domain.CustomerDetailsTestSamples.*;
import static com.example.store.domain.ProductOrderTestSamples.*;
import static com.example.store.domain.ShoppingCartTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.example.store.web.rest.TestUtil;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ShoppingCartTest {

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    // Verifica la logica de igualdad de ShoppingCart: dos carritos son iguales cuando
    // comparten el mismo id, y distintos cuando no tienen id o tienen ids diferentes.
    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShoppingCart.class);
        ShoppingCart shoppingCart1 = getShoppingCartSample1();
        ShoppingCart shoppingCart2 = new ShoppingCart();
        assertThat(shoppingCart1).isNotEqualTo(shoppingCart2);

        shoppingCart2.setId(shoppingCart1.getId());
        assertThat(shoppingCart1).isEqualTo(shoppingCart2);

        shoppingCart2 = getShoppingCartSample2();
        assertThat(shoppingCart1).isNotEqualTo(shoppingCart2);
    }

    // Verifica la relacion ShoppingCart -> CustomerDetails: permite asociar un cliente,
    // leerlo desde el carrito y luego quitarlo dejandolo en null.
    @Test
    void customerTest() {
        ShoppingCart shoppingCart = getShoppingCartRandomSampleGenerator();
        CustomerDetails customerDetailsBack = getCustomerDetailsRandomSampleGenerator();

        shoppingCart.setCustomer(customerDetailsBack);
        assertThat(shoppingCart.getCustomer()).isEqualTo(customerDetailsBack);

        shoppingCart.customer(null);
        assertThat(shoppingCart.getCustomer()).isNull();
    }

    // Verifica la relacion bidireccional entre ShoppingCart y ProductOrder.
    // Al agregar ordenes, la orden apunta al carrito; al removerlas, la referencia se limpia.
    @Test
    void ordersTest() {
        ShoppingCart shoppingCart = getShoppingCartRandomSampleGenerator();
        ProductOrder productOrderBack = getProductOrderRandomSampleGenerator();

        shoppingCart.addOrders(productOrderBack);
        assertThat(shoppingCart.getOrders()).containsOnly(productOrderBack);
        assertThat(productOrderBack.getCart()).isEqualTo(shoppingCart);

        shoppingCart.removeOrders(productOrderBack);
        assertThat(shoppingCart.getOrders()).doesNotContain(productOrderBack);
        assertThat(productOrderBack.getCart()).isNull();

        shoppingCart.orders(new HashSet<>(Set.of(productOrderBack)));
        assertThat(shoppingCart.getOrders()).containsOnly(productOrderBack);
        assertThat(productOrderBack.getCart()).isEqualTo(shoppingCart);

        shoppingCart.setOrders(new HashSet<>());
        assertThat(shoppingCart.getOrders()).doesNotContain(productOrderBack);
        assertThat(productOrderBack.getCart()).isNull();
    }

    // Verifica que un carrito sin fecha de creacion ni estado no sea valido,
    // porque ambos campos son requeridos por las validaciones del dominio.
    @Test
    void shouldRequireCreationDateAndStatus() {
        ShoppingCart shoppingCart = new ShoppingCart();

        assertThat(validator.validate(shoppingCart))
            .extracting(violation -> violation.getPropertyPath().toString())
            .contains("createdDate", "status");
    }

    // Verifica que un carrito con fecha de creacion y estado validos
    // pase las validaciones Jakarta sin errores.
    @Test
    void shouldAcceptCartWithRequiredFields() {
        ShoppingCart shoppingCart = new ShoppingCart().createdDate(Instant.parse("2026-06-12T00:00:00Z")).status("OPEN");

        assertThat(validator.validate(shoppingCart)).isEmpty();
    }
}
