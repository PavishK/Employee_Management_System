package dev.pc.ems_backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import dev.pc.ems_backend.Entity.EmployeeEntity;
import dev.pc.ems_backend.Service.EmployeeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/save-data")
    public ResponseEntity<Map<String,Object>> postMethod(@RequestBody EmployeeEntity employeeEntity) {
        var response = employeeService.saveEmployee(employeeEntity);
        if(response.get("status")!=null){
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }    

    @GetMapping("/get-all-data/{userId}")
    public ResponseEntity<List<EmployeeEntity>> getMethod(@PathVariable Long userId) {
        return ResponseEntity.ok(employeeService.getEmployeesByUserId(userId));
    }

    @PutMapping("/update-data/{id}")
    public ResponseEntity<String> putMethod(@PathVariable long id, @RequestBody EmployeeEntity employeeEntity) {
        
        var response=employeeService.updateEmployee(id,employeeEntity);

        if(response!=null){
            return ResponseEntity.ok("Employee details updated!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee id "+id+" not found!");
    }

    @DeleteMapping("/delete-data/{id}")
    public ResponseEntity<String> deleteMethod(@PathVariable long id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee id "+id+" data deleted successfully!");
    }
}
