package dev.pc.ems_backend.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pc.ems_backend.Entity.EmployeeEntity;
import dev.pc.ems_backend.Repository.EmployeeRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    //CREATE
    public Map<String,Object> saveEmployee (EmployeeEntity employeeEntity){

        Map<String,Object> map=new HashMap<>();

        if(employeeRepo.findByEmail(employeeEntity.getEmail()).isPresent()){
            map.put("message","Employee with this email "+employeeEntity.getEmail()+" already exist!");
            map.put("status", null);
            return map;
        }

        var response=employeeRepo.save(employeeEntity);
        map.put("status", true);
        map.put("id",response.getId());
        map.put("message", "Employee data saved successfully!");
        return map;
    }

    
    //SELECT
    public List<EmployeeEntity> getEmployeesByUserId (Long userId){
        return employeeRepo.findByUserId(userId);
    }

    //UPDATE
    public EmployeeEntity updateEmployee(long id,EmployeeEntity employeeEntity){
        EmployeeEntity emp=employeeRepo.findById(employeeEntity.getId()).orElse(null);

        if(emp!=null){
            emp.setFirstName(employeeEntity.getFirstName());
            emp.setLastName(employeeEntity.getLastName());
            emp.setEmail(employeeEntity.getEmail());
            emp.setPosition(employeeEntity.getPosition());
            employeeRepo.save(emp);
            return emp;
        }
        return null;
    }

    //DELETE
    public void deleteEmployee(Long id){
        employeeRepo.deleteById(id);
    }

}
