import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, User, Monitor, SpeakerHigh, GameController, ArrowCounterClockwise } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface SettingsProps {
  onBack: () => void
}

export function Settings({ onBack }: SettingsProps) {
  const [playerName, setPlayerName] = useKV<string>('player-name', 'WARRIOR')
  const [masterVolume, setMasterVolume] = useKV<number[]>('master-volume', [75])
  const [musicVolume, setMusicVolume] = useKV<number[]>('music-volume', [60])
  const [sfxVolume, setSfxVolume] = useKV<number[]>('sfx-volume', [80])
  const [graphicsQuality, setGraphicsQuality] = useKV<string>('graphics-quality', 'high')
  const [showFPS, setShowFPS] = useKV<boolean>('show-fps', true)
  const [vsync, setVsync] = useKV<boolean>('vsync', true)
  const [mouseSensitivity, setMouseSensitivity] = useKV<number[]>('mouse-sensitivity', [50])

  const handleRestoreDefaults = () => {
    setPlayerName('WARRIOR')
    setMasterVolume([75])
    setMusicVolume([60])
    setSfxVolume([80])
    setGraphicsQuality('high')
    setShowFPS(true)
    setVsync(true)
    setMouseSensitivity([50])
    toast.success('SETTINGS RESTORED TO DEFAULT')
  }

  return (
    <div className="relative w-full min-h-screen p-4 sm:p-6 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto w-full pb-16 sm:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-14"
        >
          <div className="w-full sm:w-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black glow-text mb-3 tracking-tight">SETTINGS</h1>
            <p className="text-muted-foreground font-body tracking-widest text-sm sm:text-base flex items-center gap-2">
              <GameController size={18} weight="bold" className="text-accent" />
              CONFIGURE SYSTEM PARAMETERS
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="glow-border w-full sm:w-auto h-12 px-8 font-bold hover:scale-105 active:scale-95 hover:bg-primary/10 hover:border-primary transition-all duration-200"
          >
            <ArrowLeft size={20} weight="bold" className="mr-2" />
            BACK
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-5 sm:p-10 glow-border bg-card/50 backdrop-blur-md">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-10 h-auto bg-background/50 p-2 gap-2">
                <TabsTrigger value="profile" className="text-xs sm:text-sm font-bold py-4 data-[state=active]:glow-accent data-[state=active]:bg-accent/10 data-[state=active]:shadow-[0_0_20px_rgba(245,166,35,0.2)] gap-2 transition-all duration-200">
                  <User size={18} weight="bold" className="hidden sm:inline" />
                  PROFILE
                </TabsTrigger>
                <TabsTrigger value="graphics" className="text-xs sm:text-sm font-bold py-4 data-[state=active]:glow-accent data-[state=active]:bg-accent/10 data-[state=active]:shadow-[0_0_20px_rgba(245,166,35,0.2)] gap-2 transition-all duration-200">
                  <Monitor size={18} weight="bold" className="hidden sm:inline" />
                  GRAPHICS
                </TabsTrigger>
                <TabsTrigger value="audio" className="text-xs sm:text-sm font-bold py-4 data-[state=active]:glow-accent data-[state=active]:bg-accent/10 data-[state=active]:shadow-[0_0_20px_rgba(245,166,35,0.2)] gap-2 transition-all duration-200">
                  <SpeakerHigh size={18} weight="bold" className="hidden sm:inline" />
                  AUDIO
                </TabsTrigger>
                <TabsTrigger value="controls" className="text-xs sm:text-sm font-bold py-4 data-[state=active]:glow-accent data-[state=active]:bg-accent/10 data-[state=active]:shadow-[0_0_20px_rgba(245,166,35,0.2)] gap-2 transition-all duration-200">
                  <GameController size={18} weight="bold" className="hidden sm:inline" />
                  CONTROLS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-8 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <Label htmlFor="player-name" className="text-primary font-black text-lg tracking-wide flex items-center gap-2">
                      <User size={20} weight="bold" />
                      PLAYER NAME
                    </Label>
                    <Input
                      id="player-name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                      className="glow-border font-black text-xl h-14 tracking-wider bg-background/50 hover:bg-background/70 focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-200"
                      maxLength={16}
                      placeholder="ENTER CALLSIGN"
                    />
                    <p className="text-sm text-muted-foreground tracking-wide">3-16 CHARACTERS • UPPERCASE</p>
                  </div>

                  <div className="p-8 bg-card/60 rounded-lg glow-border hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300">
                    <h3 className="font-black text-primary mb-6 text-xl tracking-wide flex items-center gap-3">
                      <span className="w-2 h-8 bg-accent rounded"></span>
                      PLAYER IDENTITY
                    </h3>
                    <div className="space-y-4 text-base">
                      <div className="flex justify-between items-center p-4 bg-background/40 rounded-md hover:bg-background/60 transition-colors duration-200">
                        <span className="text-muted-foreground font-bold">CALLSIGN</span>
                        <span className="font-black text-accent text-lg">{playerName}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-background/40 rounded-md hover:bg-background/60 transition-colors duration-200">
                        <span className="text-muted-foreground font-bold">RANK</span>
                        <span className="font-black text-primary text-lg">SERGEANT</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-background/40 rounded-md hover:bg-background/60 transition-colors duration-200">
                        <span className="text-muted-foreground font-bold">COMBAT RATING</span>
                        <span className="font-black text-foreground text-lg">1250</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="graphics" className="space-y-8 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-5">
                    <Label className="text-primary font-black text-lg tracking-wide flex items-center gap-2">
                      <Monitor size={20} weight="bold" />
                      GRAPHICS QUALITY
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['low', 'medium', 'high', 'ultra'].map((quality, index) => (
                        <motion.div
                          key={quality}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + index * 0.05 }}
                        >
                          <Button
                            onClick={() => setGraphicsQuality(quality)}
                            variant={graphicsQuality === quality ? 'default' : 'outline'}
                            className={`
                              text-sm font-black h-16 w-full
                              ${graphicsQuality === quality ? 'glow-accent bg-accent/20 border-accent shadow-[0_0_20px_rgba(245,166,35,0.2)]' : 'glow-border bg-card/60 hover:bg-card/80'}
                              hover:scale-105 active:scale-95 transition-all duration-200
                            `}
                          >
                            {quality.toUpperCase()}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-card/60 rounded-lg glow-border hover:bg-card/80 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
                        <Monitor size={24} weight="bold" className="text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="show-fps" className="font-black text-lg tracking-wide cursor-pointer">SHOW FPS COUNTER</Label>
                        <p className="text-sm text-muted-foreground mt-1">Display frame rate on screen</p>
                      </div>
                    </div>
                    <Switch
                      id="show-fps"
                      checked={showFPS}
                      onCheckedChange={setShowFPS}
                      className="data-[state=checked]:bg-accent"
                    />
                  </div>

                  <div className="flex items-center justify-between p-6 bg-card/60 rounded-lg glow-border hover:bg-card/80 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
                        <Monitor size={24} weight="bold" className="text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="vsync" className="font-black text-lg tracking-wide cursor-pointer">V-SYNC</Label>
                        <p className="text-sm text-muted-foreground mt-1">Synchronize with monitor refresh rate</p>
                      </div>
                    </div>
                    <Switch
                      id="vsync"
                      checked={vsync}
                      onCheckedChange={setVsync}
                      className="data-[state=checked]:bg-accent"
                    />
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="audio" className="space-y-8 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-5 p-8 bg-card/60 rounded-lg glow-border hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200">
                    <Label className="text-primary font-black text-lg tracking-wide flex items-center gap-2">
                      <SpeakerHigh size={20} weight="bold" />
                      MASTER VOLUME
                    </Label>
                    <div className="flex items-center gap-6">
                      <Slider
                        value={masterVolume}
                        onValueChange={setMasterVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[90px] justify-end">
                        <span className="font-black text-accent text-3xl tabular-nums">{masterVolume?.[0] ?? 75}</span>
                        <span className="text-muted-foreground text-base font-bold">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 p-8 bg-card/60 rounded-lg glow-border hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200">
                    <Label className="text-primary font-black text-lg tracking-wide flex items-center gap-2">
                      <SpeakerHigh size={20} weight="bold" />
                      MUSIC VOLUME
                    </Label>
                    <div className="flex items-center gap-6">
                      <Slider
                        value={musicVolume}
                        onValueChange={setMusicVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[90px] justify-end">
                        <span className="font-black text-accent text-3xl tabular-nums">{musicVolume?.[0] ?? 60}</span>
                        <span className="text-muted-foreground text-base font-bold">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 p-8 bg-card/60 rounded-lg glow-border hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200">
                    <Label className="text-primary font-black text-lg tracking-wide flex items-center gap-2">
                      <SpeakerHigh size={20} weight="bold" />
                      EFFECTS VOLUME
                    </Label>
                    <div className="flex items-center gap-6">
                      <Slider
                        value={sfxVolume}
                        onValueChange={setSfxVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[90px] justify-end">
                        <span className="font-black text-accent text-3xl tabular-nums">{sfxVolume?.[0] ?? 80}</span>
                        <span className="text-muted-foreground text-base font-bold">%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="controls" className="space-y-8 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-5 p-8 bg-card/60 rounded-lg glow-border hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200">
                    <Label className="text-primary font-black text-lg tracking-wide flex items-center gap-2">
                      <GameController size={20} weight="bold" />
                      MOUSE SENSITIVITY
                    </Label>
                    <div className="flex items-center gap-6">
                      <Slider
                        value={mouseSensitivity}
                        onValueChange={setMouseSensitivity}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[90px] justify-end">
                        <span className="font-black text-accent text-3xl tabular-nums">{mouseSensitivity?.[0] ?? 50}</span>
                        <span className="text-muted-foreground text-base font-bold">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-card/60 rounded-lg glow-border hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300">
                    <h3 className="font-black text-primary mb-6 text-xl tracking-wide flex items-center gap-3">
                      <span className="w-2 h-8 bg-accent rounded"></span>
                      KEY BINDINGS
                    </h3>
                    <div className="space-y-3">
                      {[
                        { action: 'MOVE FORWARD', key: 'W' },
                        { action: 'MOVE BACKWARD', key: 'S' },
                        { action: 'STRAFE LEFT', key: 'A' },
                        { action: 'STRAFE RIGHT', key: 'D' },
                        { action: 'JUMP', key: 'SPACE' },
                        { action: 'FIRE', key: 'MOUSE 1' },
                      ].map((bind, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-background/40 rounded-md hover:bg-background/60 hover:shadow-[0_0_10px_rgba(99,102,241,0.1)] transition-all duration-200 group">
                          <span className="text-muted-foreground font-bold text-base group-hover:text-foreground transition-colors">{bind.action}</span>
                          <span className="font-black bg-primary/20 text-primary px-5 py-2 rounded-md text-base border border-primary/30 group-hover:border-primary/50 group-hover:bg-primary/30 transition-all duration-200">
                            {bind.key}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-10 border-t border-border/50 flex justify-end"
            >
              <Button
                onClick={handleRestoreDefaults}
                variant="outline"
                className="glow-border w-full sm:w-auto h-14 px-10 font-black text-base hover:scale-105 active:scale-95 hover:bg-accent/10 hover:border-accent transition-all duration-200"
              >
                <ArrowCounterClockwise size={22} weight="bold" className="mr-2" />
                RESTORE DEFAULTS
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
