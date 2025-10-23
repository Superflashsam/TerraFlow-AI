"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generatePropertyDescription } from "@/ai/flows/generate-property-description";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  propertyType: z.string().min(1, "Property type is required"),
  location: z.string().min(1, "Location is required"),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  squareFootage: z.coerce.number().min(1),
  amenities: z.string().min(1, "Amenities are required"),
  uniqueFeatures: z.string().min(1, "Unique features are required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  style: z.string().min(1, "Style is required"),
  socialMediaPlatform: z.string().min(1, "Platform is required"),
});

type FormData = z.infer<typeof formSchema>;

export function ContentGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "House",
      location: "Green Valley",
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2500,
      amenities: "Pool, Gym, Park",
      uniqueFeatures: "Mountain view, contemporary design",
      targetAudience: "Families",
      style: "Professional",
      socialMediaPlatform: "Instagram",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedDescription("");
    try {
      const result = await generatePropertyDescription(data);
      setGeneratedDescription(result.description);
      toast({
        title: "Content Generated!",
        description: "Your new property description is ready.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate content. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Content Generator</CardTitle>
        <CardDescription>
          Create compelling property descriptions and social media posts in seconds.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Input id="propertyType" {...register("propertyType")} />
                {errors.propertyType && <p className="text-destructive text-sm mt-1">{errors.propertyType.message}</p>}
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location")} />
                 {errors.location && <p className="text-destructive text-sm mt-1">{errors.location.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" type="number" {...register("bedrooms")} />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" type="number" {...register("bathrooms")} />
              </div>
              <div>
                <Label htmlFor="squareFootage">Sq. Footage</Label>
                <Input id="squareFootage" type="number" {...register("squareFootage")} />
              </div>
            </div>
            <div>
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input id="amenities" {...register("amenities")} />
               {errors.amenities && <p className="text-destructive text-sm mt-1">{errors.amenities.message}</p>}
            </div>
             <div>
              <Label htmlFor="uniqueFeatures">Unique Features</Label>
              <Input id="uniqueFeatures" {...register("uniqueFeatures")} />
               {errors.uniqueFeatures && <p className="text-destructive text-sm mt-1">{errors.uniqueFeatures.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                 <Select onValueChange={(value) => { setValue("targetAudience", value); trigger("targetAudience"); }} defaultValue="Families">
                  <SelectTrigger id="targetAudience"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Families">Families</SelectItem>
                    <SelectItem value="Young Professionals">Young Professionals</SelectItem>
                    <SelectItem value="Retirees">Retirees</SelectItem>
                    <SelectItem value="Investors">Investors</SelectItem>
                  </SelectContent>
                </Select>
                 {errors.targetAudience && <p className="text-destructive text-sm mt-1">{errors.targetAudience.message}</p>}
              </div>
              <div>
                <Label htmlFor="style">Tone &amp; Style</Label>
                <Select onValueChange={(value) => { setValue("style", value); trigger("style"); }} defaultValue="Professional">
                  <SelectTrigger id="style"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Fun">Fun &amp; Casual</SelectItem>
                    <SelectItem value="Luxurious">Luxurious</SelectItem>
                    <SelectItem value="Urgent">Urgent &amp; Action-oriented</SelectItem>
                  </SelectContent>
                </Select>
                 {errors.style && <p className="text-destructive text-sm mt-1">{errors.style.message}</p>}
              </div>
            </div>
             <div>
                <Label htmlFor="socialMediaPlatform">Platform</Label>
                <Select onValueChange={(value) => { setValue("socialMediaPlatform", value); trigger("socialMediaPlatform"); }} defaultValue="Instagram">
                  <SelectTrigger id="socialMediaPlatform"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="X">X (Twitter)</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
                 {errors.socialMediaPlatform && <p className="text-destructive text-sm mt-1">{errors.socialMediaPlatform.message}</p>}
              </div>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="generated-content">Generated Content</Label>
            <Textarea
              id="generated-content"
              className="flex-grow mt-2"
              placeholder="Your AI-generated content will appear here..."
              value={generatedDescription}
              readOnly
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? "Generating..." : "Generate Content"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
