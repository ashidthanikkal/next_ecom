"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const [storeName, setStoreName] = useState("My E-Shop");
  const [currency, setCurrency] = useState("USD");
  const [darkMode, setDarkMode] = useState(false);
  const [enableCOD, setEnableCOD] = useState(true);
  const [enableStripe, setEnableStripe] = useState(false);
  const [enable2FA, setEnable2FA] = useState(true);
  const [taxRate, setTaxRate] = useState("18");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="store" className="space-y-4">
        {/* Tabs List */}
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* 🏪 Store Settings */}
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <Label>Enable Dark Mode</Label>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 💳 Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Cash on Delivery (COD)</Label>
                <Switch
                  checked={enableCOD}
                  onCheckedChange={setEnableCOD}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Stripe Payments</Label>
                <Switch
                  checked={enableStripe}
                  onCheckedChange={setEnableStripe}
                />
              </div>

              <div className="space-y-2">
                <Label>Stripe API Key</Label>
                <Input
                  type="password"
                  placeholder="sk_live_***********"
                  disabled={!enableStripe}
                />
              </div>

              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🚚 Shipping Settings */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Courier Partner</Label>
                <Input placeholder="e.g., Shiprocket, Delhivery" />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Free Shipping Over $500</Label>
                <Switch />
              </div>

              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 💸 Tax Settings */}
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Tax Rate (%)</Label>
                <Input
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  type="number"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Include Tax in Prices</Label>
                <Switch />
              </div>

              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🔒 Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Two-Factor Authentication</Label>
                <Switch
                  checked={enable2FA}
                  onCheckedChange={setEnable2FA}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Session Timeout (Minutes)</Label>
                <Input type="number" placeholder="30" className="w-32" />
              </div>

              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
