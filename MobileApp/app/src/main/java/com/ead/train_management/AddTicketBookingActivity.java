package com.ead.train_management;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.ead.train_management.models.TicketBooking;
import com.ead.train_management.models.TrainDetails;
import com.ead.train_management.service.TktBookingService;
import com.ead.train_management.util.DatabaseHelper;
import com.ead.train_management.util.RetClient;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.TimeZone;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddTicketBookingActivity extends AppCompatActivity {

    // Declare variables
    private TktBookingService bgService;
    private String nic = "";
    private String uid = "";
    private DatabaseHelper dbHelper;
    private SQLiteDatabase db;
    private Cursor cursor;
    EditText name,num,date,email,phone;
    Button addButton;
    Spinner spinner;
    HashMap<String, String> trians = new HashMap<String, String>();

    private Button openDatePickerButton;
    private DatePicker datePicker;
    private Calendar calendar;
    private String selectedDate;

    String selectedTrainId = "";

    @SuppressLint({"Range", "NonConstantResourceId"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addbooking);

        // Bottom navigation view
        BottomNavigationView bottomNavigationView=findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.book);

        // Set click listeners for bottom navigation items
        bottomNavigationView.setOnNavigationItemSelectedListener(item -> {
            switch(item.getItemId()) {
                case R.id.book:
                    return true;

                case R.id.home:
                    startActivity(new Intent(getApplicationContext(), UserProfileActivity.class));
                    overridePendingTransition(0,0);
                    return true;

                case R.id.view:
                    startActivity(new Intent(getApplicationContext(), DetailsViewActivity.class));
                    overridePendingTransition(0,0);
                    return true;
            }
            return false;
        });

        // Initialize UI elements
        name = findViewById(R.id.name3);
        num = findViewById(R.id.passengerNum);
        spinner = findViewById(R.id.spinner);
        date = findViewById(R.id.date);
        phone = findViewById(R.id.phoneNum);
        email = findViewById(R.id.emailAddress);
        addButton = findViewById(R.id.addButton);
        bgService =  RetClient.getClient().create(TktBookingService.class);
        dbHelper = new DatabaseHelper(getApplicationContext());
        db = dbHelper.getWritableDatabase();

        // Define the projection for the database query
        String[] projection = {
                "nic",
                "uid"
        };

        // Query the database to get user information
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
            uid  = cursor.getString(cursor.getColumnIndex("uid"));
        }

        // Make a network request to get train data
        Call<List<TrainDetails>> data = bgService.getTrain();

        data.enqueue(new Callback<List<TrainDetails>> () {
            @Override
            public void onResponse(Call<List<TrainDetails>>  call1, Response<List<TrainDetails>>  response1) {
                if (response1.isSuccessful() && response1.body() != null) {
                    List<TrainDetails> responseData = response1.body();
                    List<String> dt = new ArrayList<>();
                    //List<String> trainNames = new ArrayList<>();

                    for(TrainDetails d:responseData) {
                        dt.add(d.getTname());
                        //trainNames.add(d.getTname());
                        trians.put(d.getTname(),d.getTidc());
                    }
                    populateSpinner(dt);
                } else {
                    Toast.makeText(AddTicketBookingActivity.this, "Error. Please check again.", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<TrainDetails>>  call, Throwable t) {
                Toast.makeText(AddTicketBookingActivity.this, "Error. Please check again.", Toast.LENGTH_SHORT).show();
            }
        });

        //openDatePickerButton = findViewById(R.id.openDatePickerButton);
        //datePicker = new DatePicker(this);
        //calendar = Calendar.getInstance();

//        openDatePickerButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                int year = calendar.get(Calendar.YEAR);
//                int month = calendar.get(Calendar.MONTH);
//                int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
//
//                DatePickerDialog datePickerDialog = new DatePickerDialog(
//                        AddTicketBookingActivity.this,
//                        new DatePickerDialog.OnDateSetListener() {
//                            @Override
//                            public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
//                                Calendar calendar = Calendar.getInstance();
//                                calendar.set(year, month, dayOfMonth);
//
//                                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
//                                sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
//
//                                selectedDate= sdf.format(calendar.getTime());
//
//                            }
//                        },
//                        year, month, dayOfMonth
//                );
//
//                datePickerDialog.show();
//            }});

        // Set a click listener for the "Add" button
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (name.getText().toString().equals("") && email.getText().toString().equals("") && phone.getText().toString().equals("")) {
                    Toast.makeText(AddTicketBookingActivity.this, "You needs to fill all details", Toast.LENGTH_SHORT).show();
                } else {
                    String selectedValue ="";
                    if(spinner.getSelectedItem() != null){
                        selectedValue = spinner.getSelectedItem().toString();
                    }
                    TicketBooking u = new TicketBooking();
                    u.setRfid(nic);
                    u.setTid(uid);
                    u.setStatus(false);
                    u.setTrain(selectedValue);
                    u.setPhone(phone.getText().toString());
                    u.setPhone(date.getText().toString());
                    u.setEmail(email.getText().toString());
                    u.setName(name.getText().toString());
                    u.setPassno(Integer.parseInt(num.getText().toString()));
                    Call<String> call = bgService.createBooking(u);

                    call.enqueue(new Callback<String>() {
                        @Override
                        public void onResponse(Call<String> call, Response<String> response1) {
                            if (response1.isSuccessful() && response1.body() != null) {
                                Intent intent = new Intent(getApplicationContext(), DetailsViewActivity.class);
                                startActivity(intent);

                            } else {
                                Toast.makeText(AddTicketBookingActivity.this, "Error!. Please check again", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<String> call, Throwable t) {
                            Toast.makeText(AddTicketBookingActivity.this, "Error in Registration Process", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });
    }


     //For populate the spinner with train data
    private void populateSpinner(List<String> dropdownItems) {
        Spinner spinner = findViewById(R.id.spinner);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, dropdownItems);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
    }
//    private void populateSpinner(List<String> trainNames, final List<String> dt) {
//        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, trainNames);
//        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//        spinner.setAdapter(adapter);
//
//        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
//            @Override
//            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
//                selectedTrainId = dt.get(position);
//            }
//
//            @Override
//            public void onNothingSelected(AdapterView<?> parentView) {
//            }
//        });
//    }

}
