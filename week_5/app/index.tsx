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

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  acceptTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
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
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

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
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
            />

            <CustomInput
              label="อีเมล"
              placeholder="example@gmail.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
            />

            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="numeric"
            />

            <CustomInput
              label="ที่อยู่"
              placeholder="กรอกที่อยู่"
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              multiline
              numberOfLines={4}
              maxLength={200}
            />

            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
            />

            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) =>
                handleChange("confirmPassword", value)
              }
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
            />

            {/* ✅ Checkbox */}
            <Checkbox
              value={formData.acceptTerms}
              onValueChange={(value) =>
                handleChange("acceptTerms", value)
              }
              error={errors.acceptTerms}
              touched={touched.acceptTerms}
            />

            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoading}
              />

              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                loading={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
