package com.ead.train_management;

import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.ead.train_management.models.TrainDetails;
import com.ead.train_management.models.bookingUpdate;
import com.ead.train_management.models.TrainDetails;
import com.ead.train_management.service.TktBookingService;
import com.ead.train_management.service.TktBookingService;
import com.ead.train_management.util.RetClient;
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

public class UpdateActivity extends AppCompatActivity {
    private TktBookingService bgService;
    EditText name;
    EditText email;
    EditText num;
    EditText phone;
    Button updatedButton;

    private Button openDatePickerButton;
    private DatePicker datePicker;
    private Calendar calendar;
    private String selectedDate;
    Spinner spinner;

    HashMap<String, String> trains = new HashMap<String, String>();


    @SuppressLint({"Range", "NonConstantResourceId"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update);

        //Get the booking information's
        bookingUpdate receivedObject = (bookingUpdate) getIntent().getSerializableExtra("data");
        BottomNavigationView bottomNavigationView=findViewById(R.id.bottom_navigation);

        //Bottom navigation bar setup
        bottomNavigationView.setOnNavigationItemSelectedListener(item -> {

            switch(item.getItemId())
            {
                case R.id.book:
                    // Start the AddTicketBookingActivity
                    startActivity(new Intent(getApplicationContext(),AddTicketBookingActivity.class));
                    overridePendingTransition(0,0);
                    return true;

                case R.id.home:
                    // Start the UserProfileActivity
                    startActivity(new Intent(getApplicationContext(),UserProfileActivity.class));
                    overridePendingTransition(0,0);
                    return true;

                case R.id.view:
                    // Start the DetailsViewActivity
                    startActivity(new Intent(getApplicationContext(),DetailsViewActivity.class));
                    overridePendingTransition(0,0);
                    return true;
            }
            return false;
        });

        // Initialize UI elements
        name = findViewById(R.id.name4);
        phone = findViewById(R.id.phone4);
        email = findViewById(R.id.email4);
        num = findViewById(R.id.num4);
        updatedButton = findViewById(R.id.updatedButton);
        bgService =  RetClient.getClient().create(TktBookingService.class);
        spinner = findViewById(R.id.spinner1);

        // Set the initial date from the received booking data
       selectedDate = receivedObject.getDate();
        name.setText(receivedObject.getName());
        email.setText(receivedObject.getEmail());
        phone.setText(receivedObject.getPhone());
        num.setText(String.valueOf(receivedObject.getNum()));

        //Fetch train details
        Call<List<TrainDetails>> data = bgService.getTrain();

        data.enqueue(new Callback<List<TrainDetails>>() {
            @Override
            public void onResponse(Call<List<TrainDetails>>  call1, Response<List<TrainDetails>> response1) {

                if (response1.isSuccessful() && response1.body() != null) {
                    //Process train details
                    List<TrainDetails> responseData = response1.body();
                    List<String> dt = new ArrayList<>();

                    for(TrainDetails d:responseData)
                    {
                        dt.add(d.getTname());
                        trains.put(d.getTname(),d.getTidc());

                    }
                    populateSpinner(dt);
                } else {
                    Toast.makeText(UpdateActivity.this, "Error. Please check again", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<TrainDetails>>  call, Throwable t) {

                Toast.makeText(UpdateActivity.this, "Error. Please check again", Toast.LENGTH_SHORT).show();
            }
        });

        //Initialize and handle date picker
        openDatePickerButton = findViewById(R.id.openDatePickerButton1);
        datePicker = new DatePicker(this);
        calendar = Calendar.getInstance();

        openDatePickerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int year = calendar.get(Calendar.YEAR);
                int month = calendar.get(Calendar.MONTH);
                int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);

                DatePickerDialog datePickerDialog = new DatePickerDialog(
                        UpdateActivity.this,
                        new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                                Calendar calendar = Calendar.getInstance();
                                calendar.set(year, month, dayOfMonth);


                                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
                                sdf.setTimeZone(TimeZone.getTimeZone("UTC"));


                                selectedDate= sdf.format(calendar.getTime());


                            }
                        },
                        year, month, dayOfMonth
                );

                datePickerDialog.show();
            }});

        updatedButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if ( name.getText().toString().equals("")&& email.getText().toString().equals("")&& phone.getText().toString().equals("")) {
                    Toast.makeText(UpdateActivity.this, "You needs to fill all details", Toast.LENGTH_SHORT).show();
                } else {
                    String selectedValue = receivedObject.getTrain();
                    if(spinner.getSelectedItem()!=null){
                        selectedValue = spinner.getSelectedItem().toString();
                    }

                    //Create a bookingUpdate object with updated data
                    bookingUpdate u = new bookingUpdate();
                    u.setDate(selectedDate);
                    u.setId(receivedObject.getId());
                    u.setRfid(receivedObject.getRfid());
                    u.setTid(receivedObject.getTid());
                    u.setCc(false);
                    u.setTrain(selectedValue);
                    u.setPhone(phone.getText().toString());
                    u.setEmail(email.getText().toString());
                    u.setName(name.getText().toString());
                    u.setNum(Integer.parseInt(num.getText().toString()));

                    //Send update request to the server
                    Call<String> call = bgService.updateBooking(u);
                    call.enqueue(new Callback<String>() {
                        @Override
                        public void onResponse(Call<String> call, Response<String> response1) {

                            if (response1.isSuccessful() && response1.body() != null) {
                                Intent intent = new Intent(getApplicationContext(), DetailsViewActivity.class);
                                startActivity(intent);

                            } else {

                                Toast.makeText(UpdateActivity.this, "Error. Please check again", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<String> call, Throwable t) {

                            Intent intent = new Intent(getApplicationContext(), DetailsViewActivity.class);
                            startActivity(intent);
                        }
                    });

                }
            }
        });



    }

    private void populateSpinner(List<String> dropdownItems) {
        Spinner spinner = findViewById(R.id.spinner1);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, dropdownItems);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
    }


}