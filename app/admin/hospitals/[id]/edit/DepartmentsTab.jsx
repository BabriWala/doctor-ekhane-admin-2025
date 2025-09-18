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

export default function DepartmentsTab({ hospitalId }) {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "" },
  });

  // Fetch hospital departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get(`/hospital/${hospitalId}`);
        if (res.data?.departments) {
          setDepartments(res.data.departments);
        }
      } catch (error) {


        toast.error(
          error.response?.data?.message || "Failed to fetch departments"
        );
      }
    };
    fetchDepartments();
  }, [hospitalId, toast]);

  // Add or Update department
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingId) {
        const res = await api.put(
          `/hospital/${hospitalId}/departments/${editingId}`,
          data
        );
        toast({ title: "Success", description: "Department updated" });
      } else {
        const res = await api.post(`/hospital/${hospitalId}/departments`, data);
        toast({ title: "Success", description: "Department added" });
      }

      // Refresh list
      const res = await api.get(`/hospital/${hospitalId}`);
      setDepartments(res.data.departments);

      reset({ name: "" });
      setEditingId(null);
    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to save department"
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit department
  const handleEdit = (dept) => {
    reset({ name: dept.name });
    setEditingId(dept._id);
  };

  // Delete department
  const handleDelete = async (departmentId) => {
    try {
      await api.delete(`/hospital/${hospitalId}/departments/${departmentId}`);
      toast({ title: "Deleted", description: "Department deleted" });

      setDepartments((prev) =>
        prev.filter((dept) => dept._id !== departmentId)
      );
    } catch (error) {


      toast.error(
        error.response?.data?.message || "Failed to delete department"
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Departments</CardTitle>
        <CardDescription>
          Manage hospital departments (add, edit, delete)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Department Name *</Label>
              <Input
                {...register("name", {
                  required: "Department name is required",
                })}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Department"
                  : "Add Department"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset({ name: "" });
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="space-y-4">
          {departments.length === 0 ? (
            <p className="text-gray-500">No departments yet.</p>
          ) : (
            departments.map((dept) => (
              <div
                key={dept._id}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <p className="font-medium">{dept.name}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(dept)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(dept._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
