import AuthFormSteps from "@/components/AuthFormSteps";
import RegisterVerificationCard from "@/components/RegisterVerificationCard";
import DonorRegisterForm from "./components/DonorRegisterForm";

const RegisterAsDonorPage = () => {
  return <AuthFormSteps renderComponents={[DonorRegisterForm, RegisterVerificationCard]} />;
};

export default RegisterAsDonorPage;
