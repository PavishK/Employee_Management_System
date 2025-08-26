package dev.pc.ems_backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.pc.ems_backend.Entity.EmployeeEntity;

public interface EmployeeRepo extends JpaRepository<EmployeeEntity,Long>{
    Optional<EmployeeEntity> findByEmail(String email);
    List<EmployeeEntity> findByUserId(Long userId);
}