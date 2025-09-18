"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreateHospitalForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/hospital/basic-info", {
        name: data.name,
        registrationNumber: data.registrationNumber,
        type: data.type,
        establishedYear: data.establishedYear,
        description: data.description,
        status: data.status,
        phone: data.phone,
        email: data.email,
      });
      toast({ title: "Success", description: "Hospital created successfully" });
      router.push("/admin/hospitals");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create hospital");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Hospital</CardTitle>
          <CardDescription>Fill in the hospital details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
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

            {/* Contact */}
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Hospital"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
