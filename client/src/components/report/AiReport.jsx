import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import toast from "react-hot-toast";
import ButtonM from "../ui/ButtonM";
import Loader from "../ui/Loader";
import A4Preview from "./A4Preview";
import { Download } from "lucide-react";
import axios from "axios";
import { ContentScrollable } from "../ui/ContentScrollable";

const AiReport = ({ stat, closeGenerateConfirmation }) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const generateReport = async () => {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTU5ZmQzYWQtOTBiZC00ZDllLThiM2ItZGJiY2M2ODkwYTJkIiwidHlwZSI6ImFwaV90b2tlbiJ9.XnJmmssdb19_PecZ5410vqpQXcok44UXjOCMYAzfdgM",
      },
      data: {
        providers: "openai",
        text: `Generate a comprehensive report with markdown code formatted nicely for a labwork on chemical compounds`,
        temperature: 0,
        max_tokens: 1000,
        fallback_providers: "google",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.openai.generated_text;
    } catch (error) {
      throw new Error(error);
    }
  };

  const generateMutation = useMutation(generateReport, {
    onSuccess: (data) => {
      setContent(data);
      toast.success("Report generated successfully");
    },
    onError: (error) => {
      toast.error("Error generating report");
    },
    onSettled: () => {
      queryClient.invalidateQueries("reports"); // Invalidate relevant query if needed
    },
  });

  return (
    <div className="flex flex-col p-4 space-y-4 bg-app-background-1 text-app-white h-full">
      {content.length < 2 ? (
        <p className="text-center text-lg">Click continue to generate the report </p>
      ) : (
        <ContentScrollable content={<A4Preview content={content} />} />
        
      )}
      <div className="flex justify-end space-x-2 ">
        {generateMutation.isSuccess && (
            <Download   width={20} height={20} />
        )}
        <ButtonM
          onClick={() => generateMutation.mutate()}
          className="bg-red-500 px-4 py-2 rounded-md"
          disabled={generateMutation.isLoading}
        >
          {generateMutation.isLoading ? (
            <Loader
              message={"   generating.."}
              color="white"
              width={20}
              height={20}
            />
          ) : (
            "Continue"
          )}
        </ButtonM>
        <ButtonM
          onClick={closeGenerateConfirmation}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          disabled={generateMutation.isLoading}
        >
          Cancel
        </ButtonM>
      </div>
    </div>
  );
};

export default AiReport;
