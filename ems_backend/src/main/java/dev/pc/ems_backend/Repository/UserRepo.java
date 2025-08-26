package dev.pc.ems_backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.pc.ems_backend.Entity.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findOneByEmail(String email);
}