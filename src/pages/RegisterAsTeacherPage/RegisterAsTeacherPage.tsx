import AuthFormSteps from "@/components/AuthFormSteps";
import RegisterVerificationCard from "@/components/RegisterVerificationCard";
import TeacherRegisterForm from "./components/TeacherRegisterForm";

const RegisterAsTeacherPage = () => {
  return <AuthFormSteps renderComponents={[TeacherRegisterForm, RegisterVerificationCard]} />;
};

export default RegisterAsTeacherPage;
