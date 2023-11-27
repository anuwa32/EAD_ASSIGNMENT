package com.ead.train_management;

import android.content.ContentValues;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.ead.train_management.models.Login;
import com.ead.train_management.models.loginRes;
import com.ead.train_management.models.userResources;
import com.ead.train_management.service.UserLoginService;
import com.ead.train_management.util.DatabaseHelper;
import com.ead.train_management.util.RetClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    Button loginButton;
    private UserLoginService lgService;
    EditText username;
    EditText password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Initialize UI elements
        username = findViewById(R.id.username);
        password = findViewById(R.id.password);
        loginButton = findViewById(R.id.loginButton);

        // Initialize Retrofit service for API calls
        lgService =  RetClient.getClient().create(UserLoginService.class);

        // Initialize SQLite database helper
        DatabaseHelper dbHelper = new DatabaseHelper(getApplicationContext());
        SQLiteDatabase db = dbHelper.getWritableDatabase();

        // Set a click listener for the login button
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Check username and password is empty or not empty
                if (username.getText().toString().equals("") && password.getText().toString().equals("")) {
                    Toast.makeText(LoginActivity.this, "You needs to fill all details", Toast.LENGTH_SHORT).show();
                } else {
                    // Create a login request object
                    Login loginRequest = new Login();
                    loginRequest.setNic(username.getText().toString());
                    loginRequest.setPassword(password.getText().toString());

                    // Login API call
                    Call<loginRes> call = lgService.Login(loginRequest);
                    call.enqueue(new Callback<loginRes>() {
                        @Override
                        public void onResponse(Call<loginRes> call, Response<loginRes> response) {
                            // Check if the response is successful and response is not null
                            if (response.isSuccessful() && response.body() != null) {
                                loginRes userResponse = response.body();
                                if(userResponse.getRole().equals("traveler")) {

                                    Call<userResources> data = lgService.getUserProfile(userResponse.getNic());
                                    data.enqueue(new Callback<userResources>() {
                                        @Override
                                        public void onResponse(Call<userResources> call1, Response<userResources> response1) {
                                            if (response1.isSuccessful() && response1.body() != null) {
                                                userResources res = response1.body();
                                                if (res.isAcc()) {

                                                    ContentValues values = new ContentValues();
                                                    values.put("nic", userResponse.getNic());
                                                    values.put("uid", res.getId());

                                                    long newRowId = db.insert("users", null, values);
                                                    if (newRowId != -1) {
                                                        // If the insertion is successful, navigate to the profile activity page
                                                        Intent intent = new Intent(getApplicationContext(), UserProfileActivity.class);
                                                        startActivity(intent);
                                                    } else {
                                                        Toast.makeText(LoginActivity.this, "Error in login process", Toast.LENGTH_SHORT).show();
                                                    }
                                                } else {
                                                    Toast.makeText(LoginActivity.this, "Account is disabled", Toast.LENGTH_SHORT).show();
                                                }
                                            } else {
                                                Toast.makeText(LoginActivity.this, "Error in login process", Toast.LENGTH_SHORT).show();
                                            }
                                        }

                                        @Override
                                        public void onFailure(Call<userResources> call, Throwable t) {
                                            Toast.makeText(LoginActivity.this, "Error in login process", Toast.LENGTH_SHORT).show();
                                        }
                                    });
                                } else {
                                    Toast.makeText(LoginActivity.this, "Wrong Account Type", Toast.LENGTH_SHORT).show();
                                }
                            } else {
                                Toast.makeText(LoginActivity.this, "Error in login process", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<loginRes> call, Throwable t) {
                            Toast.makeText(LoginActivity.this, "Failed to log", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });
    }

    // Navigate to the registration activity
    public void navigateToReg(View view) {
        Intent intent = new Intent(this, UserRegisterActivity.class);
        startActivity(intent);
    }
}
