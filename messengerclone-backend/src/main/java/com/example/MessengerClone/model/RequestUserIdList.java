package com.example.MessengerClone.model;


import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestUserIdList {
    private List<String> userIdList;
}
