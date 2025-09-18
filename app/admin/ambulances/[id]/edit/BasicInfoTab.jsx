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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BasicInfoTab({ ambulanceId }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vehicleNumber: "",
      type: "",
      driverName: "",
      driverLicense: "",
    },
  });

  // Fetch ambulance data on mount
  useEffect(() => {
    const fetchAmbulance = async () => {
      try {
        const res = await api.get(`/ambulance/${ambulanceId}`);
        if (res.data?.ambulance?.basicInfo) {
          reset(res.data.ambulance.basicInfo);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch ambulance info"
        );
      }
    };
    fetchAmbulance();
  }, [ambulanceId, reset, toast]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put(`/ambulance/${ambulanceId}/basic-info`, data);

      toast.success("Ambulance info updated successfully"); // ✅ success toast
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update ambulance info"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Update ambulance’s basic information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Vehicle Number *</Label>
              <Input
                {...register("vehicleNumber", {
                  required: "Vehicle Number is required",
                })}
                disabled={loading}
              />
              {errors.vehicleNumber && (
                <p className="text-xs text-red-500">
                  {errors.vehicleNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Type *</Label>
              <Select
                value={watch("type")}
                onValueChange={(value) => setValue("type", value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {["Basic", "Advanced", "ICU"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Driver Name *</Label>
              <Input
                {...register("driverName", {
                  required: "Driver Name is required",
                })}
                disabled={loading}
              />
              {errors.driverName && (
                <p className="text-xs text-red-500">
                  {errors.driverName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Driver License</Label>
              <Input {...register("driverLicense")} disabled={loading} />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Info"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
