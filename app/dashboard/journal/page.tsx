'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PlusCircle, X, Upload } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDropzone } from 'react-dropzone'

const overallStats = {
  winRate: 65,
  avgRiskReward: 1.5,
  avgTradeDuration: '2h 15m',
  mostProfitableSession: 'London',
  leastProfitableSession: 'Sydney',
  mostTradedPair: 'EUR/USD',
  mostProfitablePair: 'GBP/JPY',
  leastProfitablePair: 'AUD/CAD',
  highestLossesInRow: 3
}

const pairStats = {
  'EUR/USD': { winRate: 70, avgRiskReward: 1.6, avgTradeDuration: '1h 45m', totalTrades: 50 },
  'GBP/JPY': { winRate: 68, avgRiskReward: 1.8, avgTradeDuration: '2h 30m', totalTrades: 35 },
  'AUD/CAD': { winRate: 55, avgRiskReward: 1.2, avgTradeDuration: '1h 30m', totalTrades: 20 }
}

// Define a type for the keys of pairStats
type PairKeys = keyof typeof pairStats;

export default function JournalPage() {
  const [selectedPair, setSelectedPair] = useState<PairKeys>('EUR/USD') //ill see this
  const [tradingSetup, setTradingSetup] = useState({
    entryCriteria: [''],
    confluences: [''],
    tradingModels: [''],
    tradingPairs: ['']
  })
  const [dailySetup, setDailySetup] = useState({
    date: '',
    pair: '',
    beforeImage: null as File | null,
    afterImage: null as File | null,
    result: '',
    confluences: [''],
    notes: ''
  })

  const addField = (field: keyof typeof tradingSetup) => {
    setTradingSetup(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeField = (field: keyof typeof tradingSetup, index: number) => {
    setTradingSetup(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const updateField = (field: keyof typeof tradingSetup, index: number, value: string) => {
    setTradingSetup(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const handleTradingSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Trading setup submitted:', tradingSetup)
    // Here you would typically send this data to your backend
  }

  const handleDailySetupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Daily setup submitted:', dailySetup)
    // Here you would typically send this data to your backend
  }

  const addConfluence = () => {
    setDailySetup(prev => ({
      ...prev,
      confluences: [...prev.confluences, '']
    }))
  }

  const removeConfluence = (index: number) => {
    setDailySetup(prev => ({
      ...prev,
      confluences: prev.confluences.filter((_, i) => i !== index)
    }))
  }

  const updateConfluence = (index: number, value: string) => {
    setDailySetup(prev => ({
      ...prev,
      confluences: prev.confluences.map((item, i) => i === index ? value : item)
    }))
  }

  const onDrop = useCallback((acceptedFiles: File[], type: 'beforeImage' | 'afterImage') => {
    if (acceptedFiles.length > 0) {
      setDailySetup(prev => ({ ...prev, [type]: acceptedFiles[0] }))
    }
  }, [])

  const { getRootProps: getBeforeImageRootProps, getInputProps: getBeforeImageInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'beforeImage'),
    accept: { 'image/*': [] },
    multiple: false
  })

  const { getRootProps: getAfterImageRootProps, getInputProps: getAfterImageInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'afterImage'),
    accept: { 'image/*': [] },
    multiple: false
  })

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Trading Journal</h1>

      <Tabs defaultValue="overall">
        <TabsList>
          <TabsTrigger value="overall">Overall Stats</TabsTrigger>
          <TabsTrigger value="pairStats">Pair Stats</TabsTrigger>
          <TabsTrigger value="models">Models & Criteria</TabsTrigger>
          <TabsTrigger value="tradingSetup">Trading Setup</TabsTrigger>
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
                <BarChart data={[ 
                  { name: 'London', value: 100 }, 
                  { name: 'New York', value: 80 }, 
                  { name: 'Tokyo', value: 60 }, 
                  { name: 'Sydney', value: 40 }, 
                ]}>
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
                      <TableCell>{(stats.winRate * stats.avgRiskReward / 100).toFixed(2)}</TableCell>
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
                <SelectItem key={pair} value={pair}>{pair}</SelectItem>
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
                <LineChart data={[ 
                  { date: '2023-01', pips: 50 }, 
                  { date: '2023-02', pips: 80 }, 
                  { date: '2023-03', pips: 60 }, 
                  { date: '2023-04', pips: 100 }, 
                  { date: '2023-05', pips: 85 }, 
                ]}>
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
                    <Label htmlFor={field} className="text-lg font-semibold capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    {tradingSetup[field].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          id={`${field}-${index}`}
                          value={item}
                          onChange={(e) => updateField(field, index, e.target.value)}
                          placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeField(field, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addField(field)}
                      className="mt-2"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add {field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}
                    </Button>
                  </div>
                ))}
                <Button type="submit">Save Trading Setup</Button>
              </form>
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
                    onChange={(e) => setDailySetup(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pair">Currency Pair</Label>
                  <Input
                    id="pair"
                    value={dailySetup.pair}
                    onChange={(e) => setDailySetup(prev => ({ ...prev, pair: e.target.value }))}
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
                    onChange={(e) => setDailySetup(prev => ({ ...prev, result: e.target.value }))}
                    placeholder="e.g., +50 pips, -20 pips"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Confluences</Label>
                  {dailySetup.confluences.map((confluence, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={confluence}
                        onChange={(e) => updateConfluence(index, e.target.value)}
                        placeholder="Enter confluence"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeConfluence(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addConfluence}
                    className="mt-2"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Confluence
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={dailySetup.notes}
                    onChange={(e) => setDailySetup(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any additional notes about the trade"
                  />
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