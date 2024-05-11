"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
       <p className="text-[20px] sm:text-[16px] md:text-[20px] font-semibold">Collections</p>  
       <Button className="bg-blue-800 opacity-70 text-white px-3 py-2 sm:px-2 sm:py-1" onClick={() => router.push("/collections/new")}>
  <Plus className="h-3 w-3 mr-1" />
  Create Collection
</Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
