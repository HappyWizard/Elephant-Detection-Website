import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { IconButton, Select, Input, Button, VStack, HStack } from '@chakra-ui/react';
import { Card } from 'react-bootstrap';
import { FaChartBar } from 'react-icons/fa';
import './SolarSimulationGraph.css';

const sampleData = [
  { time: 'Sep', solar: 90, battery: 50 },
  { time: 'Oct', solar: 70, battery: 60 },
  { time: 'Nov', solar: 100, battery: 80 },
  { time: 'Dec', solar: 80, battery: 70 },
  { time: 'Jan', solar: 90, battery: 70 },
  { time: 'Feb', solar: 100, battery: 85 },
];

const generateRandomData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => {
    const solar = Math.floor(Math.random() * 200) + 50;
    const battery = Math.floor(Math.random() * 150) + 30;
    const consumption = Math.floor(Math.random() * 100) + 10;
    const shortage = Math.max(0, consumption - (solar - battery));
    return { time: month, solar, battery, consumption, shortage };
  });
};

const SolarSimulationGraph = () => {
  const [data, setData] = useState(generateRandomData());
  const [newEntry, setNewEntry] = useState({ time: '', solar: '', battery: '', consumption: '' });

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const updateDataPoint = () => {
    if (!newEntry.time || !newEntry.solar || !newEntry.battery || !newEntry.consumption) return;
    
    const updatedData = data.map(entry => {
      if (entry.time === newEntry.time) {
        const solar = parseFloat(newEntry.solar);
        const battery = parseFloat(newEntry.battery);
        const consumption = parseFloat(newEntry.consumption);
        const shortage = Math.max(0, consumption - (solar - battery));
        return { time: newEntry.time, solar, battery, consumption, shortage };
      }
      return entry;
    });
    
    setData(updatedData);
    setNewEntry({ time: '', solar: '', battery: '', consumption: '' });
  };

  return (
    <Card className="simulation-card">
      <div className="graph-info">
        <h2>Solar Simulation</h2>
        <p>Update values to modify the graph dynamically.</p>
      </div>
      
      <VStack spacing={2} padding={4} align="stretch">
        <HStack>
          <IconButton icon={<FaChartBar />} aria-label='Chart' size='sm' />
          <Select name="time" placeholder="Select Month" value={newEntry.time} onChange={handleInputChange}>
            {data.map((entry) => <option key={entry.time} value={entry.time}>{entry.time}</option>)}
          </Select>
          <Input name="solar" type="number" placeholder="Solar Power" value={newEntry.solar} onChange={handleInputChange} />
          <Input name="battery" type="number" placeholder="Battery Level" value={newEntry.battery} onChange={handleInputChange} />
          <Input name="consumption" type="number" placeholder="Consumption" value={newEntry.consumption} onChange={handleInputChange} />
          <Button onClick={updateDataPoint} colorScheme="pink">Go</Button>
        </HStack>
      </VStack>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#057fe3" stopOpacity={1} />
              <stop offset="100%" stopColor="#045091" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="colorBattery" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#009efd" stopOpacity={1} />
              <stop offset="100%" stopColor="#2af598" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff203" stopOpacity={1} />
              <stop offset="100%" stopColor="#fff203" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="colorShortage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#05faee" stopOpacity={1} />
              <stop offset="100%" stopColor="#02f795" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fill: '#b0b0b0' }} />
          <YAxis tick={{ fill: '#b0b0b0' }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: 'none', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }} />
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
          
          <Line type="monotone" dataKey="solar" stroke="url(#colorSolar)" strokeWidth={5} dot={false} />
          <Line type="monotone" dataKey="battery" stroke="url(#colorBattery)" strokeWidth={5} dot={false} />
          <Line type="monotone" dataKey="consumption" stroke="url(#colorConsumption)" strokeWidth={5} dot={false} />
          <Line type="monotone" dataKey="shortage" stroke="url(#colorShortage)" strokeWidth={5} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <div className="card-header">
        <span className="time-period">This month</span>
        {/* <span className="chart-icon">📊</span> */}
        <IconButton icon={<FaChartBar />} aria-label='Chart' size='sm' />
      </div>
      <div className="graph-info">
        <h2>52.8 W</h2>
        <p>Total Power Consumption <span className="positive">+2.45%</span></p>
        <span className="status">🟢 Efficient Power Usage</span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sampleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6a11cb" stopOpacity={1} />
              <stop offset="100%" stopColor="#2575fc" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="colorBattery" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#009efd" stopOpacity={1} />
              <stop offset="100%" stopColor="#2af598" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fill: '#b0b0b0' }} />
          <YAxis hide />
          <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: 'none', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }} />
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
          <Line type="monotone" dataKey="solar" stroke="url(#colorSolar)" strokeWidth={5} dot={{ r: 5, fill: '#6a11cb' }} />
          <Line type="monotone" dataKey="battery" stroke="url(#colorBattery)" strokeWidth={5} dot={{ r: 5, fill: '#009efd' }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SolarSimulationGraph;
















