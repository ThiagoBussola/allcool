package br.com.allcool.test;

import br.com.allcool.config.AllcoolProfilesUtils;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.core.annotation.AliasFor;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.test.context.ActiveProfiles;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WebMvcTest
@AutoConfigureMockMvc
@EnableSpringDataWebSupport
@ActiveProfiles(value = AllcoolProfilesUtils.TEST)
public @interface ResourceTest {

    @AliasFor(value = "controllers", annotation = WebMvcTest.class)
    Class<?>[] value() default {};
}
