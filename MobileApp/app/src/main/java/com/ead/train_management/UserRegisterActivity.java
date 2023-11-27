package com.ead.train_management;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.ead.train_management.models.userDetails;
import com.ead.train_management.models.userResources;
import com.ead.train_management.service.UserLoginService;
import com.ead.train_management.util.RetClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserRegisterActivity extends AppCompatActivity {

    private UserLoginService lgService;
    EditText nic;
    EditText firstName;
    EditText lastName;
    EditText phoneNumber;
    EditText password;
    Button regButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        // Initialize UI elements
        nic = findViewById(R.id.nic);
        firstName = findViewById(R.id.firstName);
        lastName = findViewById(R.id.lastName);
        phoneNumber = findViewById(R.id.phoneNumber);
        password = findViewById(R.id.password);
        regButton = findViewById(R.id.regButton);

        lgService =  RetClient.getClient().create(UserLoginService.class);

        // Set a click listener for the registration button
        regButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // if any required fields are empty, show error message
                if (nic.getText().toString().equals("") && password.getText().toString().equals("") &&
                        firstName.getText().toString().equals("") && lastName.getText().toString().equals("") &&
                        phoneNumber.getText().toString().equals("")) {

                    Toast.makeText(UserRegisterActivity.this, "You needs to fill all details", Toast.LENGTH_SHORT).show();
                } else {

                    // Create a user object
                    userDetails u = new userDetails();
                    userDetails.UserInfo ui = u.new UserInfo();
                    u.setAcc(true);
                    u.setNic(nic.getText().toString());
                    u.setPhone(phoneNumber.getText().toString());
                    u.setFname(firstName.getText().toString());
                    u.setLname(lastName.getText().toString());
                    ui.setPassword(password.getText().toString());
                    ui.setRole("traveler");
                    u.setData(ui);

                    Call<userResources> call = lgService.Reg(u);
                    call.enqueue(new Callback<userResources>() {
                        @Override
                        public void onResponse(Call<userResources> call, Response<userResources> response) {
                            if (response.isSuccessful() && response.body() != null) {
                                // If Registration process successful, navigate to the login screen
                                Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                                startActivity(intent);
                            } else {
                                // If registration process failed display error message
                                Toast.makeText(UserRegisterActivity.this, "Error. Please check again", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<userResources> call, Throwable t) {
                            // If registration process failed display error message
                            Toast.makeText(UserRegisterActivity.this, "Failed to Register", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });
    }

    // Method to navigate to the login screen
    public void navigateToLogin(View view) {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }
}
