import "../index.css";
import { useLanguage } from "./useUser";

export default function AboutContent() {
  const { language } = useLanguage();

  return (
    <div className="about-section">