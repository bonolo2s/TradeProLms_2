"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PlusCircle, X, Eye ,ListChecks } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useDropzone } from "react-dropzone"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Mock data - replace with actual data fetching in a real application
const overallStats = {
  winRate: 65,
  avgRiskReward: 1.5,
  avgTradeDuration: "2h 15m",
  mostProfitableSession: "London",
  leastProfitableSession: "Sydney",
  mostTradedPair: "EUR/USD",
  mostProfitablePair: "GBP/JPY",
  leastProfitablePair: "AUD/CAD",
  highestLossesInRow: 3,
}

// Define an interface for the structure of each pair's stats
interface PairStat {
  winRate: number;
  avgRiskReward: number;
  avgTradeDuration: string;
  totalTrades: number;
}

// Define the pairStats object with string keys and PairStat values
const pairStats: Record<string, PairStat> = {
  'EUR/USD': { winRate: 70, avgRiskReward: 1.6, avgTradeDuration: '1h 45m', totalTrades: 50 },
  'GBP/JPY': { winRate: 68, avgRiskReward: 1.8, avgTradeDuration: '2h 30m', totalTrades: 35 },
  'AUD/CAD': { winRate: 55, avgRiskReward: 1.2, avgTradeDuration: '1h 30m', totalTrades: 20 }
}

// Define a type for the keys of pairStats
type PairKeys = keyof typeof pairStats;
// Mock data for completed trades
const completedTrades = [
  {
    id: 1,
    pair: "EUR/USD",
    date: "2025-01-10",
    result: "Win",
    pips: 45,
    model: "Trend Following",
    beforeImage: "/placeholder.svg?height=300&width=500",
    afterImage: "/placeholder.svg?height=300&width=500",
    confluences: ["Support level", "RSI divergence", "Moving average crossover"],
  },
  {
    id: 2,
    pair: "EUR/USD",
    date: "2025-01-08",
    result: "Loss",
    pips: -20,
    model: "Breakout",
    beforeImage: "/placeholder.svg?height=300&width=500",
    afterImage: "/placeholder.svg?height=300&width=500",
    confluences: ["Resistance breakout", "Volume increase"],
  },
  {
    id: 3,
    pair: "EUR/USD",
    date: "2025-01-05",
    result: "Win",
    pips: 30,
    model: "Mean Reversion",
    beforeImage: "/placeholder.svg?height=300&width=500",
    afterImage: "/placeholder.svg?height=300&width=500",
    confluences: ["Oversold RSI", "Price at support zone", "Bullish engulfing pattern"],
  },
  {
    id: 4,
    pair: "GBP/JPY",
    date: "2025-01-12",
    result: "Win",
    pips: 60,
    model: "Trend Following",
    beforeImage: "/placeholder.svg?height=300&width=500",
    afterImage: "/placeholder.svg?height=300&width=500",
    confluences: ["Uptrend continuation", "Higher highs and higher lows", "Strong momentum"],
  },
  {
    id: 5,
    pair: "GBP/JPY",
    date: "2025-01-07",
    result: "Win",
    pips: 35,
    model: "Breakout",
    beforeImage: "/placeholder.svg?height=300&width=500",
    afterImage: "/placeholder.svg?height=300&width=500",
    confluences: ["Triangle pattern breakout", "Increased volatility"],
  },
  {
    id: 6,
    pair: "AUD/CAD",
    date: "2025-01-11",
    result: "Loss",
    pips: -25,
    model: "Mean Reversion",
    beforeImage: "/placeholder.svg?height=300&width=500",
    afterImage: "/placeholder.svg?height=300&width=500",
    confluences: ["Overbought RSI", "Price at resistance zone"],
  },
]

export default function JournalPage() {
  const [selectedPair, setSelectedPair] = useState("EUR/USD")
  const [tradingSetup, setTradingSetup] = useState({
    tradingModelName: [""],
    entryCriteriaOrConfluence: [""]
  })
  const [dailySetup, setDailySetup] = useState({
    date: "",
    pair: "",
    beforeImage: null as File | null,
    afterImage: null as File | null,
    result: "",
    confluences: [""],
    notes: "",
    tradeManagementRules: [""],
  })
  const [selectedTrade, setSelectedTrade] = useState<(typeof completedTrades)[0] | null>(null)

  const addField = (field: keyof typeof tradingSetup) => {
    setTradingSetup((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeField = (field: keyof typeof tradingSetup, index: number) => {
    setTradingSetup((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const updateField = (field: keyof typeof tradingSetup, index: number, value: string) => {
    setTradingSetup((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleTradingSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Trading setup submitted:", tradingSetup)
    // Here you would typically send this data to your backend
  }

  const handleDailySetupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Daily setup submitted:", dailySetup)
    // Here you would typically send this data to your backend
  }

  const addConfluence = () => {
    setDailySetup((prev) => ({
      ...prev,
      confluences: [...prev.confluences, ""],
    }))
  }

  const removeConfluence = (index: number) => {
    setDailySetup((prev) => ({
      ...prev,
      confluences: prev.confluences.filter((_, i) => i !== index),
    }))
  }

  const updateConfluence = (index: number, value: string) => {
    setDailySetup((prev) => ({
      ...prev,
      confluences: prev.confluences.map((item, i) => (i === index ? value : item)),
    }))
  }

  const addManagementRule = () => {
    setDailySetup((prev) => ({
      ...prev,
      tradeManagementRules: [...prev.tradeManagementRules, ""],
    }))
  }

  const removeManagementRule = (index: number) => {
    setDailySetup((prev) => ({
      ...prev,
      tradeManagementRules: prev.tradeManagementRules.filter((_, i) => i !== index),
    }))
  }

  const updateManagementRule = (index: number, value: string) => {
    setDailySetup((prev) => ({
      ...prev,
      tradeManagementRules: prev.tradeManagementRules.map((item, i) => (i === index ? value : item)),
    }))
  }

  const onDrop = (acceptedFiles: File[], type: "beforeImage" | "afterImage") => {
    if (acceptedFiles.length > 0) {
      setDailySetup((prev) => ({ ...prev, [type]: acceptedFiles[0] }))
    }
  }

  const { getRootProps: getBeforeImageRootProps, getInputProps: getBeforeImageInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "beforeImage"),
    accept: { "image/*": [] },
    multiple: false,
  })

  const { getRootProps: getAfterImageRootProps, getInputProps: getAfterImageInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "afterImage"),
    accept: { "image/*": [] },
    multiple: false,
  })

  // Filter trades by selected pair
  const filteredTrades = completedTrades.filter((trade) => trade.pair === selectedPair)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Trading Journal</h1>

      <Tabs defaultValue="overall">
        <TabsList>
          <TabsTrigger value="overall">Overall Stats</TabsTrigger>
          <TabsTrigger value="pairStats">Pair Stats</TabsTrigger>
          <TabsTrigger value="models">Models & Criteria stats</TabsTrigger>
          <TabsTrigger value="tradingSetup">Definining Models</TabsTrigger>
          <TabsTrigger value="dailySetups">Daily Setups</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overallStats.winRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avg Risk/Reward</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overallStats.avgRiskReward}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avg Trade Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overallStats.avgTradeDuration}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Session Profitability</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "London", value: 100 },
                    { name: "New York", value: 80 },
                    { name: "Tokyo", value: 60 },
                    { name: "Sydney", value: 40 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pair Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pair</TableHead>
                    <TableHead>Profitability</TableHead>
                    <TableHead>Total Trades</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(pairStats).map(([pair, stats]) => (
                    <TableRow key={pair}>
                      <TableCell>{pair}</TableCell>
                      <TableCell>{((stats.winRate * stats.avgRiskReward) / 100).toFixed(2)}</TableCell>
                      <TableCell>{stats.totalTrades}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pairStats" className="space-y-4">
          <Select onValueChange={setSelectedPair} defaultValue={selectedPair}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select pair" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(pairStats).map((pair) => (
                <SelectItem key={pair} value={pair}>
                  {pair}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pairStats[selectedPair].winRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avg Risk/Reward</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pairStats[selectedPair].avgRiskReward}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avg Trade Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pairStats[selectedPair].avgTradeDuration}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { date: "2023-01", pips: 50 },
                    { date: "2023-02", pips: 80 },
                    { date: "2023-03", pips: 60 },
                    { date: "2023-04", pips: 100 },
                    { date: "2023-05", pips: 85 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pips" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Completed Trades Table */}
          <Card>
            <CardHeader>
              <CardTitle>Completed Trades for {selectedPair}</CardTitle>
              <CardDescription>History of all completed trades for this pair</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredTrades.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Pips</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Confluences</TableHead>
                      <TableHead>Images</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrades.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>{new Date(trade.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={trade.result === "Win" ? "bg-green-500" : "bg-red-500"}>
                            {trade.result}
                          </Badge>
                        </TableCell>
                        <TableCell className={trade.pips > 0 ? "text-green-600" : "text-red-600"}>
                          {trade.pips > 0 ? `+${trade.pips}` : trade.pips}
                        </TableCell>
                        <TableCell>{trade.model}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {trade.confluences.map((confluence, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {confluence}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell> {/*Lol the dialog or modal can be internal*/}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedTrade(trade)}>
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Trade Details - {trade.pair} on {new Date(trade.date).toLocaleDateString()}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <h3 className="font-medium mb-2">Before Trade</h3>
                                  <img
                                    src={trade.beforeImage || "/placeholder.svg"}
                                    alt="Before trade"
                                    className="w-full rounded-md border"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium mb-2">After Trade</h3>
                                  <img
                                    src={trade.afterImage || "/placeholder.svg"}
                                    alt="After trade"
                                    className="w-full rounded-md border"
                                  />
                                </div>
                              </div>
                              <div className="mt-4">
                                <h3 className="font-medium mb-2">Trade Information</h3>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-sm text-gray-500">Result</p>
                                    <p
                                      className={
                                        trade.result === "Win"
                                          ? "text-green-600 font-medium"
                                          : "text-red-600 font-medium"
                                      }
                                    >
                                      {trade.result}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Pips</p>
                                    <p
                                      className={
                                        trade.pips > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"
                                      }
                                    >
                                      {trade.pips > 0 ? `+${trade.pips}` : trade.pips}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Model</p>
                                    <p>{trade.model}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h3 className="font-medium mb-2">Confluences</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                  {trade.confluences.map((confluence, index) => (
                                    <li key={index}>{confluence}</li>
                                  ))}
                                </ul>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">No completed trades found for {selectedPair}</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Best Performing Models</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Win Rate</TableHead>
                    <TableHead>Avg R:R</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Trend Following</TableCell>
                    <TableCell>72%</TableCell>
                    <TableCell>1.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Breakout</TableCell>
                    <TableCell>68%</TableCell>
                    <TableCell>2.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mean Reversion</TableCell>
                    <TableCell>65%</TableCell>
                    <TableCell>1.5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Entry Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Confluence of multiple timeframes</li>
                <li>Price action at key support/resistance levels</li>
                <li>Divergence on RSI indicator</li>
                <li>Breakout of consolidation patterns</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Effective Management Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use of trailing stops</li>
                <li>Scaling out at predefined targets</li>
                <li>Adjusting position size based on volatility</li>
                <li>Time-based exits for mean reversion trades</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tradingSetup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Trading Setup</CardTitle>
              <CardDescription>Define your personal trading strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTradingSetupSubmit} className="space-y-6">
                {(Object.keys(tradingSetup) as Array<keyof typeof tradingSetup>).map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="text-lg font-semibold capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    {tradingSetup[field].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          id={`${field}-${index}`}
                          value={item}
                          onChange={(e) => updateField(field, index, e.target.value)}
                          placeholder={`Enter ${field
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .toLowerCase()}`}
                        />
                        <Button type="button" variant="outline" size="icon" onClick={() => removeField(field, index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addField(field)} className="mt-2">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add{" "}
                      {field
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .toLowerCase()}
                    </Button>
                  </div>
                ))}
                <Button type="submit">Save Trading Setup</Button>
              </form>
            </CardContent>
          </Card>

          {/* Display Saved Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Strategies</CardTitle>
              <CardDescription>Your defined trading strategies</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mock saved strategies - replace with actual data from backend */}
              <div className="space-y-4" style={{overflowY: "scroll", maxHeight: "300px"}}>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Trend Following Model</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Entry Criteria/Confluence</h4>
                      <ul className="list-disc pl-5 mt-1">
                        <li>Higher highs and higher lows on multiple timeframes</li>
                        <li>Price above 200 EMA</li>
                        <li>RSI above 50</li>
                        <li>Volume increasing on breakouts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Breakout Model</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Entry Criteria/Confluence</h4>
                      <ul className="list-disc pl-5 mt-1">
                        <li>Price breaking out of consolidation pattern</li>
                        <li>Increased volume on breakout</li>
                        <li>Previous resistance/support level broken</li>
                        <li>Confirmation candle pattern</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Mean Reversion Model</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Entry Criteria/Confluence</h4>
                      <ul className="list-disc pl-5 mt-1">
                        <li>Oversold/overbought RSI conditions</li>
                        <li>Price at major support/resistance level</li>
                        <li>Divergence between price and oscillator</li>
                        <li>Candlestick reversal pattern</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="dailySetups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Trade Setup</CardTitle>
              <CardDescription>Log your daily trade setups and results</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDailySetupSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={dailySetup.date}
                    onChange={(e) => setDailySetup((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pair">Currency Pair</Label>
                  <Input
                    id="pair"
                    value={dailySetup.pair}
                    onChange={(e) => setDailySetup((prev) => ({ ...prev, pair: e.target.value }))}
                    placeholder="e.g., EUR/USD"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Before Trade Image</Label>
                  <div
                    {...getBeforeImageRootProps()}
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <input {...getBeforeImageInputProps()} />
                    {dailySetup.beforeImage ? (
                      <p>{dailySetup.beforeImage.name}</p>
                    ) : (
                      <p>Drag and drop an image here, or click to select</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>After Trade Image</Label>
                  <div
                    {...getAfterImageRootProps()}
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <input {...getAfterImageInputProps()} />
                    {dailySetup.afterImage ? (
                      <p>{dailySetup.afterImage.name}</p>
                    ) : (
                      <p>Drag and drop an image here, or click to select</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="result">Trade Result</Label>
                  <Input
                    id="result"
                    value={dailySetup.result}
                    onChange={(e) => setDailySetup((prev) => ({ ...prev, result: e.target.value }))}
                    placeholder="e.g., +50 pips, -20 pips"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Confluences/ Model used</Label>
                  {dailySetup.confluences.map((confluence, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={confluence}
                        onChange={(e) => updateConfluence(index, e.target.value)}
                        placeholder="Enter confluence"
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => removeConfluence(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addConfluence} className="mt-2">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Confluence
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={dailySetup.notes}
                    onChange={(e) => setDailySetup((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any additional notes about the trade"
                  />
                </div>
                  {/* Trade Management Rules Section */}
                  <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ListChecks className="h-5 w-5 text-gray-700" />
                    <Label className="text-lg font-semibold">Trade Management Rules Followed</Label>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    {dailySetup.tradeManagementRules.map((rule, index) => (
                      <div key={index} className="flex items-start space-x-2 mb-2">
                        <div className="mt-2.5 h-2 w-2 rounded-full bg-gray-700 flex-shrink-0" />
                        <Input
                          value={rule}
                          onChange={(e) => updateManagementRule(index, e.target.value)}
                          placeholder="Enter management rule you followed"
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeManagementRule(index)}
                          className="flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addManagementRule} className="mt-2">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Management Rule
                    </Button>
                  </div>
                </div>
                <Button type="submit">Save Daily Setup</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
