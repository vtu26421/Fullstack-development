package com.veltech.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiGatewayApplication { // <-- Changed this to match the file name
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args); // <-- Changed this too
    }
}
