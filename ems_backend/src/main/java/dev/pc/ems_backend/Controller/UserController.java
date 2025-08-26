package dev.pc.ems_backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pc.ems_backend.Entity.UserEntity;
import dev.pc.ems_backend.Service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/save-signin-data")
    public ResponseEntity<Map<String,Object>> postMethodName(@RequestBody UserEntity userEntity) {
        return ResponseEntity.ok(userService.saveUser(userEntity));
    }
}
