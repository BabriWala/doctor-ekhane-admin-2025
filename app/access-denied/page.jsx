// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldX, ArrowLeft } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ShieldX className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            You dont have permission to access this page. Please contact your
            administrator if you believe this is an error.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
