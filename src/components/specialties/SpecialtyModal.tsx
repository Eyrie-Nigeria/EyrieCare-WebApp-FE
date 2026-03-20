"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  FileText,
  Link as LinkIcon,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateSpecialty,
  useUpdateSpecialty,
  useUploadSpecialtyImage,
} from "@/lib/hooks/useSpecialties";
import { useOrganizations } from "@/lib/hooks/useAdmin";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Specialty, SpecialtyResource } from "@/lib/types/specialties";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { SPECIALTY_CATEGORIES } from "@/lib/constants/specialties";

interface SpecialtyModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialty?: Specialty | null;
}

export function SpecialtyModal({
  isOpen,
  onClose,
  specialty,
}: SpecialtyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Clinical",
    is_active: true,
    organization_id: "",
  });
  const [resources, setResources] = useState<
    { title: string; url: string; id?: string }[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createSpecialty, isPending: isCreating } =
    useCreateSpecialty();
  const { mutateAsync: updateSpecialty, isPending: isUpdating } =
    useUpdateSpecialty();
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadSpecialtyImage();

  const user = useAuthStore((state) => state.user);
  const isSuperAdmin = user?.role === "superadmin";

  const { data: orgsResponse } = useOrganizations({ per_page: 100 });
  const organizations = orgsResponse?.data || [];

  useEffect(() => {
    if (specialty) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: specialty.name,
        description: specialty.description || "",
        category: specialty.category || "Clinical",
        is_active: specialty.is_active ?? true,
        organization_id: specialty.organization_id || "",
      });
      setResources(specialty.resources || []);
      setImagePreview(specialty.image_url || null);
    } else {
      setFormData({
        name: "",
        description: "",
        category: "Clinical",
        is_active: true,
        organization_id: "",
      });
      setResources([]);
      setImagePreview(null);
    }
    setSelectedFile(null);
  }, [specialty, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addResource = () => {
    setResources([...resources, { title: "", url: "" }]);
  };

  const updateResource = (
    index: number,
    field: "title" | "url",
    value: string,
  ) => {
    const newResources = [...resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setResources(newResources);
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let savedSpecialty: Specialty;

      if (specialty) {
        // Update existing
        savedSpecialty = await updateSpecialty({
          id: specialty.id,
          data: {
            ...formData,
            resources: resources as SpecialtyResource[], // Cast for update
          },
        });
        toast.success("Specialty updated successfully");
      } else {
        // Create new
        savedSpecialty = await createSpecialty({
          ...formData,
          organization_id: formData.organization_id || null,
          resources: resources.map(({ title, url }) => ({ title, url })),
        });
        toast.success("Specialty created successfully");
      }

      // 2nd Step: Upload Image if selected
      if (selectedFile && savedSpecialty.id) {
        await uploadImage({ id: savedSpecialty.id, file: selectedFile });
        toast.success("Icon uploaded successfully");
      }

      onClose();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  const isLoading = isCreating || isUpdating || isUploading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-card-dashboard-dark rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 shrink-0">
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              {specialty ? "Edit Specialty" : "Create Specialty"}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              {specialty
                ? "Update clinical module parameters"
                : "Initialize a new clinical rotation module"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 sm:p-3 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl transition-all active:scale-95"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8 custom-scrollbar"
        >
          {/* Grid Layout for basic info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Col: Image Upload */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Iconography
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "aspect-square rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group",
                  imagePreview
                    ? "border-primary-dashboard/30 bg-primary-dashboard/5"
                    : "border-slate-200 dark:border-white/10 hover:border-primary-dashboard/50 bg-slate-50 dark:bg-white/[0.02]",
                )}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                ) : (
                  <>
                    <div className="size-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 mb-3 group-hover:text-primary-dashboard transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">
                      Upload SVG or PNG
                    </p>
                  </>
                )}

                {imagePreview && (
                  <div className="absolute inset-0 bg-primary-dashboard/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">
                      Change Icon
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".svg,.png,.jpg,.jpeg,.webp"
              />
              <p className="text-[10px] text-center text-slate-400 font-medium">
                Max size: 5MB • Formats: SVG, PNG, JPG
              </p>
            </div>

            {/* Right Cols: Form Fields */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Specialty Name
                </label>
                <Input
                  required
                  placeholder="e.g., Internal Medicine"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="rounded-2xl h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full h-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-bold text-sm text-slate-900 dark:text-white outline-none focus:ring-2 ring-primary-dashboard/10 appearance-none"
                  >
                    {SPECIALTY_CATEGORIES.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-white dark:bg-card-dashboard-dark text-slate-900 dark:text-white"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    Status
                  </label>
                  <div className="flex items-center h-12 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                    <label className="flex items-center gap-2 cursor-pointer w-full">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            is_active: e.target.checked,
                          })
                        }
                        className="size-4 accent-primary-dashboard"
                      />
                      <span className="text-sm font-bold dark:text-white">
                        Active Status
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Description
                </label>
                <Textarea
                  placeholder="Provide a brief overview of what this specialty covers..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="rounded-2xl min-h-[100px] bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-medium py-4"
                />
              </div>

              {isSuperAdmin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    Target Organization (SuperAdmin Only)
                  </label>
                  <select
                    value={formData.organization_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organization_id: e.target.value,
                      })
                    }
                    className="w-full h-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-bold text-sm text-slate-900 dark:text-white outline-none focus:ring-2 ring-primary-dashboard/10 appearance-none"
                  >
                    <option
                      value=""
                      className="bg-white dark:bg-card-dashboard-dark text-slate-900 dark:text-white"
                    >
                      Global (No Organization)
                    </option>
                    {organizations.map((org) => (
                      <option
                        key={org.id}
                        value={org.id}
                        className="bg-white dark:bg-card-dashboard-dark text-slate-900 dark:text-white"
                      >
                        {org.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <hr className="border-slate-100 dark:border-white/5" />

          {/* Resources Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Clinical Resources
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Medical guidelines, drug formularies, and study links
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addResource}
                className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 dark:border-white/10"
              >
                <Plus className="w-3.5 h-3.5 mr-2" /> Add Link
              </Button>
            </div>

            <div className="space-y-3">
              {resources.length > 0 ? (
                resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 group"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                        <Input
                          placeholder="Resource Title (e.g., Clinical Manual)"
                          value={resource.title}
                          onChange={(e) =>
                            updateResource(index, "title", e.target.value)
                          }
                          className="h-11 pl-10 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-xs font-bold"
                        />
                      </div>
                      <div className="relative">
                        <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                        <Input
                          placeholder="URL (https://...)"
                          value={resource.url}
                          onChange={(e) =>
                            updateResource(index, "url", e.target.value)
                          }
                          className="h-11 pl-10 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-xs font-medium"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeResource(index)}
                      className="size-11 p-0 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="py-10 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[2rem] flex flex-col items-center justify-center text-center opacity-40">
                  <BookOpen className="w-8 h-8 mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    No resources attached
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Action Bar */}
        <div className="p-5 sm:p-8 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between bg-slate-50/50 dark:bg-white/5 shrink-0 gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">
            {specialty
              ? "Strategy Version: 2.1.0"
              : "Platform Standard Template"}
          </p>
          <div className="flex w-full sm:w-auto gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none h-11 sm:h-12 px-6 sm:px-8 rounded-2xl border-slate-200 dark:border-white/10 font-bold uppercase tracking-widest text-[10px] sm:text-xs"
            >
              Discard
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="flex-[1.5] sm:flex-none h-11 sm:h-12 px-6 sm:px-8 rounded-2xl bg-primary-dashboard hover:bg-primary-dashboard/90 text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs shadow-lg shadow-primary-dashboard/20 flex items-center justify-center gap-2 sm:gap-3 transition-all active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : specialty ? (
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {isLoading
                ? "Sync..."
                : specialty
                  ? "Apply Changes"
                  : "Commit Specialty"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
