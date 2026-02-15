import "./global.css";
import React, { useState } from "react";
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
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import Checkbox from "./components/Checkbox";
import GenderRadio from "./components/GenderRadio";
import DatePickerField from "./components/DatePickerField";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  gender: string;
  birthDate: Date | null;
  acceptTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  gender?: string;
  birthDate?: string;
  acceptTerms?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: "",
    birthDate: null,
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateAge = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }

    return age;
  };

  const validateField = (name: keyof FormData, value: any) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "กรุณากรอกชื่อ-นามสกุล";
        if (value.trim().length < 3)
          return "ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร";
        return;

      case "email":
        if (!value.trim()) return "กรุณากรอกอีเมล";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "รูปแบบอีเมลไม่ถูกต้อง";
        return;

      case "phone":
        if (!value.trim()) return "กรุณากรอกเบอร์โทรศัพท์";
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value))
          return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
        return;

      case "password":
        if (!value) return "กรุณากรอกรหัสผ่าน";
        if (value.length < 6)
          return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        return;

      case "confirmPassword":
        if (!value) return "กรุณายืนยันรหัสผ่าน";
        if (value !== formData.password)
          return "รหัสผ่านไม่ตรงกัน";
        return;

      case "address":
        if (!value.trim()) return "กรุณากรอกที่อยู่";
        if (value.trim().length < 10)
          return "ต้องกรอกอย่างน้อย 10 ตัวอักษร";
        return;

      case "gender":
        if (!value) return "กรุณาเลือกเพศ";
        return;

      case "birthDate":
        if (!value) return "กรุณาเลือกวันเกิด";
        if (validateAge(value) < 13)
          return "อายุต้องมากกว่า 13 ปี";
        return;

      case "acceptTerms":
        if (!value) return "กรุณายอมรับข้อกำหนดก่อน";
        return;

      default:
        return;
    }
  };

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      Alert.alert(
        "ข้อมูลไม่ถูกต้อง",
        "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง"
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("สำเร็จ", "ลงทะเบียนเรียบร้อยแล้ว");
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      gender: "",
      birthDate: null,
      acceptTerms: false,
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกให้ครบถ้วน
            </Text>
          </View>

          <View className="px-6 mt-6 space-y-4">

            <CustomInput
              label="ชื่อ-นามสกุล"
              value={formData.fullName}
              onChangeText={(v) => handleChange("fullName", v)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
            />

            {/* ✅ Gender */}
            <GenderRadio
              value={formData.gender}
              onChange={(v) => handleChange("gender", v)}
              error={errors.gender}
            />

            {/* ✅ Birth Date */}
            <DatePickerField
              value={formData.birthDate}
              onChange={(date) =>
                handleChange("birthDate", date)
              }
              error={errors.birthDate}
            />

            <CustomInput
              label="อีเมล"
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
            />

            <CustomInput
              label="เบอร์โทรศัพท์"
              value={formData.phone}
              onChangeText={(v) => handleChange("phone", v)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="numeric"
            />

            <CustomInput
              label="ที่อยู่"
              value={formData.address}
              onChangeText={(v) => handleChange("address", v)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              multiline
              numberOfLines={4}
            />

            <CustomInput
              label="รหัสผ่าน"
              value={formData.password}
              onChangeText={(v) => handleChange("password", v)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
            />

            <CustomInput
              label="ยืนยันรหัสผ่าน"
              value={formData.confirmPassword}
              onChangeText={(v) =>
                handleChange("confirmPassword", v)
              }
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
            />

            <Checkbox
              value={formData.acceptTerms}
              onValueChange={(v) =>
                handleChange("acceptTerms", v)
              }
              error={errors.acceptTerms}
              touched={touched.acceptTerms}
            />

            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                loading={isLoading}
              />

              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
