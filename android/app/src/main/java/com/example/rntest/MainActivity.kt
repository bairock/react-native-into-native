package com.example.rntest

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import com.facebook.soloader.SoLoader
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        navigateButton.setOnClickListener {
            val text = valueEditText.text.toString()
            val intent = Intent(this, MyReactActivity::class.java)

            if(text.trim().isNotEmpty()) {
                intent.putExtra("value",text)
                startActivity(intent)
            }else{
                Toast.makeText(applicationContext, "Please enter value", Toast.LENGTH_SHORT).show()
            }
        }
        SoLoader.init(this, /* native exopackage */ false)
    }
}
