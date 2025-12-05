// "use client";
// import { useEffect } from "react";

// export default function GuideFlowProvider() {
//   useEffect(() => {
//     if (window.guideflow) return;

//     const script = document.createElement("script");
//     script.src = "https://app.guideflow.com/embed/guideflow.js"; // dominio correto
//     script.async = true;
//     script.onload = () => console.log("GuideFlow carregado");
//     script.onerror = () => console.error("Erro ao carregar GuideFlow");
//     document.body.appendChild(script);
//   }, []);

//   return null;
// }
