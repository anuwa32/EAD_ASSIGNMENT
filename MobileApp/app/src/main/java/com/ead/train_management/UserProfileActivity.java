package com.ead.train_management;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.ead.train_management.models.disableAccount;
import com.ead.train_management.models.userResources;
import com.ead.train_management.service.UserLoginService;
import com.ead.train_management.util.DatabaseHelper;
import com.ead.train_management.util.RetClient;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

@SuppressWarnings("deprecation")
public class UserProfileActivity extends AppCompatActivity {

    private UserLoginService lgService;
    private  String nic = "";
    private String uid = "";
    private DatabaseHelper dbHelper;
    private SQLiteDatabase db;
    private Cursor cursor;
    EditText firstName, lastName, phoneNumber;
    Button updateButton, disableButton, logOutButton;
    EditText date;

    // When the activity is created. This method is called.
    @SuppressLint({"Range", "NonConstantResourceId"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        // Initialize UI elements and services
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.home);

        // Set for the bottom navigation view.
        bottomNavigationView.setOnNavigationItemSelectedListener(item -> {
            switch (item.getItemId()) {
                case R.id.book:
                    startActivity(new Intent(getApplicationContext(), AddTicketBookingActivity.class));
                    overridePendingTransition(0, 0);
                    return true;

                case R.id.home:
                    return true;

                case R.id.view:
                    startActivity(new Intent(getApplicationContext(), DetailsViewActivity.class));
                    overridePendingTransition(0, 0);
                    return true;
            }
            return false;
        });

        firstName = findViewById(R.id.firstName);
        lastName = findViewById(R.id.lastName);
        phoneNumber = findViewById(R.id.phoneNumber);
        date = findViewById(R.id.date2);
        updateButton = findViewById(R.id.updateButton);
        disableButton = findViewById(R.id.disableButton);
        logOutButton = findViewById(R.id.logOutButton);
        lgService = RetClient.getClient().create(UserLoginService.class);
        dbHelper = new DatabaseHelper(getApplicationContext());
        db = dbHelper.getWritableDatabase();

        // Get user information
        String[] projection = {
                "nic",
                "uid"
        };
        cursor = db.query(
                "users",
                projection,
                null,
                null,
                null,
                null,
                null
        );

        if (cursor.moveToFirst()) {
            nic = cursor.getString(cursor.getColumnIndex("nic"));
            uid = cursor.getString(cursor.getColumnIndex("uid"));
        }

        // Retrieve user profile data
        Call<userResources> data = lgService.getUserProfile(nic);

        data.enqueue(new Callback<userResources>() {
            @Override
            public void onResponse(Call<userResources> call1, Response<userResources> response1) {
                if (response1.isSuccessful() && response1.body() != null) {
                    userResources res = response1.body();
                    // Set the retrieved data to UI elements
                    firstName.setText(res.getFname());
                    lastName.setText(res.getLname());
                    phoneNumber.setText(res.getPhone());
                    date.setText(res.getDate());
                } else {
                    Toast.makeText(UserProfileActivity.this, "Error. Please check again!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<userResources> call, Throwable t) {
                Toast.makeText(UserProfileActivity.this, "Error. Please check again!", Toast.LENGTH_SHORT).show();
            }
        });

        // For the update button
        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (firstName.getText().toString().equals("") && lastName.getText().toString().equals("") && phoneNumber.getText().toString().equals("")) {
                    Toast.makeText(UserProfileActivity.this, "You needs to fill all details", Toast.LENGTH_SHORT).show();
                } else {
                    // Create a userRes object and update user information on the server using Retrofit
                    userResources u = new userResources();
                    u.setAcc(true);
                    u.setNic(nic);
                    u.setPhone(phoneNumber.getText().toString());
                    u.setFname(firstName.getText().toString());
                    u.setLname(lastName.getText().toString());
                    u.setDate(date.getText().toString());
                    u.setId(uid);
                    Call<userResources> call = lgService.Update(u);
                    call.enqueue(new Callback<userResources>() {
                        @Override
                        public void onResponse(Call<userResources> call, Response<userResources> response) {
                            if (response.isSuccessful() && response.body() != null) {
                                // Refresh the activity after updating
                                Intent intent = new Intent(getApplicationContext(), UserProfileActivity.class);
                                startActivity(intent);
                            } else {
                                Toast.makeText(UserProfileActivity.this, "Error. Please check again", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<userResources> call, Throwable t) {
                            Toast.makeText(UserProfileActivity.this, "Failed to Register. Please check again", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });
    }

    // This method is called when the "Log Out" button is clicked.
    public void LogOut(View view) {
        // Delete user data from the database and navigate to the login screen
        int deletedRows = db.delete("users", null, null);
        cursor.close();
        dbHelper.close();
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }

    // This method is called when the "Disable" button is clicked.
    public void Disable(View view) {
        // Disable the user account on the server
        disableAccount d = new disableAccount();
        d.setAcc(false);
        Call<userResources> data = lgService.Dis(nic, d);

        data.enqueue(new Callback<userResources>() {
            @Override
            public void onResponse(Call<userResources> call1, Response<userResources> response1) {
                if (response1.isSuccessful() && response1.body() != null) {
                    // Call the LogOut method to log out the user
                    LogOut(view);
                } else {
                    Toast.makeText(UserProfileActivity.this, "Error. Please check again!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<userResources> call, Throwable t) {
                Toast.makeText(UserProfileActivity.this, "Error. Please check again!.", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
