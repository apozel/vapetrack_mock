export interface Ecig {
  power: Power;
  resistor: Resistor;
  turnOn: boolean;
}

export interface Power {
  value: number;
  min: number;
  max: number;
}

export interface Resistor {
  value: number;
  min: number;
  max: number;
}

export interface EcigChartData {
  label: string;
  value: number;
}

export interface EcigActive {
  date: string;
  power: number;
  resistor: number;
  duration: number;
}
