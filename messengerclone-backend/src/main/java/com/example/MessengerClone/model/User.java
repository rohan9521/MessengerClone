package com.example.MessengerClone.model;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Builder
@Getter
@Setter
@Document(value="User")
public class User {
    @MongoId
    private String userId;
    private String name;
    private String password;
    private String email;
}
