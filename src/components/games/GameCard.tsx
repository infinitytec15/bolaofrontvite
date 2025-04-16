import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Trophy } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  id?: string;
  title?: string;
  league?: string;
  date?: string;
  time?: string;
  minBet?: number;
  onClick?: () => void;
}

const GameCard = ({
  id = "1",
  title = "Flamengo vs Corinthians",
  league = "Campeonato Brasileiro",
  date = "12/06/2023",
  time = "19:30",
  minBet = 10,
  onClick = () => {},
}: GameCardProps) => {
  return (
    <div className="w-full max-w-[350px]">
      <Card
        variant="neon"
        hoverEffect={true}
        className="h-full bg-black/40 backdrop-blur-md border-gray-800 overflow-hidden animate-float"
      >
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <motion.h3
                className="text-lg font-bold text-white mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-gray-800/80 text-green-400 backdrop-blur-sm"
                >
                  {league}
                </Badge>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-4 text-gray-300 text-sm mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-green-400 animate-pulse-glow" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-green-400 animate-pulse-glow" />
              <span>{time}</span>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-1 mt-4 text-amber-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Trophy className="h-4 w-4 animate-pulse-glow" />
            <span className="text-sm">Aposta mínima: </span>
            <span className="font-bold">R$ {minBet.toFixed(2)}</span>
          </motion.div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={onClick}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold transition-all shadow-neon-green hover:shadow-neon-green"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Bolões
            </motion.span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameCard;
