package dev.pc.ems_backend.Config;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Value("${client.url}")
    private String clientUrl;

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry){
                registry.addMapping("/**").allowedOrigins(clientUrl)
                .allowedMethods("GET","POST","PUT","DELETE").allowedHeaders("*")
                .allowCredentials(false);
            }
        };
    }

}
