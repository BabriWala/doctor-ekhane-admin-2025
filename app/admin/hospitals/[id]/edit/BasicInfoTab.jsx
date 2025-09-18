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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BasicInfoTab({ hospitalId }) {
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
      name: "",
      registrationNumber: "",
      type: "",
      establishedYear: "",
      description: "",
      status: "Active",
      phone: "",
      email: "",
    },
  });

  // Fetch hospital data on mount
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await api.get(`/hospital/${hospitalId}`);
        if (res.data?.basicInfo) {
          reset({
            ...res.data.basicInfo,
            phone: res.data.contact?.phone || "",
            email: res.data.contact?.email || "",
          });
        }
      } catch (error) {


        toast.error(
          error.response?.data?.message || "Failed to fetch hospital details"
        );
      }
    };
    fetchHospital();
  }, [hospitalId, reset, toast]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Only update basic info + contact, exclude logo/images
      const updatePayload = {
        name: data.name,
        registrationNumber: data.registrationNumber,
        type: data.type,
        establishedYear: data.establishedYear,
        description: data.description,
        status: data.status,
        phone: data.phone,
        email: data.email,
      };

      await api.put(`/hospital/${hospitalId}/basic-info`, updatePayload);


      toast.success("Hospital basic info updated successfully"); // ✅ success toast

    } catch (error) {


      toast.error(
        error.response?.data?.message || "Failed to update hospital info"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Update hospital’s basic information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Name *</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Registration Number</Label>
              <Input {...register("registrationNumber")} disabled={loading} />
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
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Specialized">Specialized</SelectItem>
                  <SelectItem value="Clinic">Clinic</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Established Year</Label>
              <Input
                type="number"
                {...register("establishedYear")}
                disabled={loading}
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <Label>Description</Label>
              <Textarea
                {...register("description")}
                rows={4}
                disabled={loading}
              />
            </div>

            <div className="space-y-1">
              <Label>Status *</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) => setValue("status", value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Phone</Label>
              <Input {...register("phone")} disabled={loading} />
            </div>

            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" {...register("email")} disabled={loading} />
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
