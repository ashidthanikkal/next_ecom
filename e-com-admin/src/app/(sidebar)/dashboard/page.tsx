import { ChartAreaInteractive } from "@/components/ui/areachart/areachart";
import { Badge } from "@/components/ui/badge";
import { ChartBarMultiple } from "@/components/ui/barchart/barchart";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartPieDonutText } from "@/components/ui/piechart/piechart";
import { ChartRadialText } from "@/components/ui/radialchart/radialchart";
import { IconTrendingUp } from "@tabler/icons-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2">
          <ChartAreaInteractive />
        </div>
        <div>
          <ChartBarMultiple />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <ChartRadialText />
        </div>
        <div>
          <ChartPieDonutText />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $1,250.00
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Growth Rate</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                4.5%
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Steady performance increase{" "}
                <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Meets growth projections
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
