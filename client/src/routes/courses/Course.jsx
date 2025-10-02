import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  title,
  description,
  image,
  price,
  grade,
  id,
  paid,
  fromDash
}) {
  const navigate = useNavigate();
  let addToCart = async (id) => {
    let res = await fetch("http://localhost:5000/api/addtocart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    console.log(await res.json());
    if (res.ok) {
      navigate("/cart");
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-md rounded-2xl overflow-hidden">
      {/* الصورة */}
      <div className="w-full h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <CardHeader className="pb-2">
        {/* العنوان */}
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {/* grade */}
        <span className="text-sm text-gray-500">{grade}</span>
      </CardHeader>

      <CardContent className="flex flex-col justify-between space-y-4">
        {/* الوصف */}
        <p className="text-sm text-gray-600">{description}</p>

        {/* السعر + الزرار */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => {
              if(fromDash || paid){
                navigate(id)
              }else{
                addToCart(id)
              }
            }}
            className="rounded-xl"
          >
            {fromDash? "Enter": paid? "Enter" : "Add to cart"}
          </Button>
          <span className="text-lg font-semibold">${price}</span>
        </div>
      </CardContent>
    </Card>
  );
}
