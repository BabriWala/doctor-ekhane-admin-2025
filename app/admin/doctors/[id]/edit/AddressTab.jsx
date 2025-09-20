// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import api from "@/lib/api";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddressTab({ doctorId }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
  });

  // Fetch doctor's current address
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await api.get(`/doctor/${doctorId}`);
        if (res.data?.personalDetails?.address) {
          reset(res.data.personalDetails.address);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch address");
      }
    };
    fetchDoctor();
  }, [doctorId, reset, toast]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put(`/doctor/${doctorId}/address`, data);
      toast.success("Address updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>Update doctor’s address details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Street</Label>
              <Input {...register("street")} disabled={loading} />
            </div>
            <div className="space-y-1">
              <Label>City</Label>
              <Input {...register("city")} disabled={loading} />
            </div>
            <div className="space-y-1">
              <Label>State</Label>
              <Input {...register("state")} disabled={loading} />
            </div>
            <div className="space-y-1">
              <Label>Country</Label>
              <Input {...register("country")} disabled={loading} />
            </div>
            <div className="space-y-1">
              <Label>ZIP</Label>
              <Input {...register("zip")} disabled={loading} />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
