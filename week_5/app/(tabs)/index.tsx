import "./global.css"
import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

//Interface สำหรับข้อมูล Form
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

//Interface สำหรับ Error Messages
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Index() {
  //State สำหรับเก็บข้อมูล Form
  const [formData, setFormData] = useState<FormData>({
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: ""
  });

  //State สำหรับเก็บ Error Messages
  const [errors, setErrors] = useState<FormErrors>({});

  //State สำหรับเช็คว่า field ไหนถูก touch แล้ว
  const [touched, setTouched] = useState<{ [key: string]: boolean}>({});

  //State สำหรับ loading
  const [isLoading, setIsLoading] = useState(false);
}

//ฟังก์ชัน Validation สำหรับแต่ละ field 
const validateField = (name: string, value: string): string | undefined => {
  switch (name) {
    case "fullName":
      if (!value.trim()) {
        return "กรุณากรอกชื่อ-นามสกุล";
      }
      if (value.trim().length < 3) {
        return "ชื่อ-นามสกุลต้องมีอักษรอย่างน้อย 3 ตัวอักษร";
      }
      return undefined;

    case "email":
      if (!value.trim()) {
        return "กรุณากรอกอีเมล";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "รูปแบบอีเมลไม่ถูกต้อง";
      }
      return undefined;

    case "phone":
      if (!value.trim()) {
        return "กรุณากรอกเบอร์โทรศัพท์";
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
      }
      return undefined;

    case "password":
      if (!value) {
        return "กรุณากรอกรหัสผ่าน";
      }
      if (value.length < 6) {
        return "รหัสผ่านต้องมีอักษรอย่างน้อย 6 ตัวอักษร";
      }
      return undefined;

    // case "confirmPassword":
    //   if (!value) {
    //     return "กรุณายืนยันรหัสผ่าน";
    //   }
    //   if (value !== FormData.password) {
    //     return "รหัสผ่านไม่ตรงกัน";
    //   }
    //   return undefined;

    default:
      return undefined;
  }
};