package com.example.MessengerClone.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class AppConfig {

    @Bean
    public Cloudinary getCloudinary(){
        Map config = new HashMap();
        config.put("cloud_name","dgfm3sxeb");
        config.put("api_key","479167433544253");
        config.put("api_secret","UHuRC7hGSESGuyJB9e5lNVy2TI4");
        config.put("secure","true");

        return new Cloudinary(config);
    }
}
