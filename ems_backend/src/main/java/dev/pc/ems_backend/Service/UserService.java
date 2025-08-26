package dev.pc.ems_backend.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pc.ems_backend.Entity.UserEntity;
import dev.pc.ems_backend.Repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public Map<String, Object> saveUser(UserEntity userEntity){
        Map<String,Object> response=new HashMap<>();
        var existingUser= userRepo.findOneByEmail(userEntity.getEmail());

        if(existingUser.isPresent()){
            response.put("message", "Login successfully!");
            response.put("user", existingUser.get());
            return response;
        }

        UserEntity newUser=userRepo.save(userEntity);
        response.put("message", "Registered successfully!");
        response.put("user", newUser);
        return response;
    }
}