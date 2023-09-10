package com.example.MessengerClone.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProfileImageRequest {
    private String userId;
    private String profileImageUrl;
}
