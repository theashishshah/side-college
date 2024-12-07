"use client";
import { useParams } from "next/navigation";

function Page(data) {
  const params = useParams();
  console.log(params);
  return (
    <div>
      Something is wrong here, in the message field
    </div>
  );
}

export default Page;
