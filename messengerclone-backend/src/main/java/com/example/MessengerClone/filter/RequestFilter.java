package com.example.MessengerClone.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class RequestFilter extends org.springframework.web.filter.OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(RequestFilter.class);
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println(request.toString());
        filterChain.doFilter(request,response);
    }
}
