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
    <div className="relative w-full min-h-screen p-4 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto w-full pb-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12"
        >
          <div className="w-full sm:w-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black glow-text mb-2 tracking-tight">SETTINGS</h1>
            <p className="text-muted-foreground font-body tracking-widest text-sm sm:text-base flex items-center gap-2">
              <GameController size={16} weight="bold" className="text-accent" />
              CONFIGURE SYSTEM PARAMETERS
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="glow-border w-full sm:w-auto h-11 px-6"
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
          <Card className="p-4 sm:p-8 glow-border bg-card/40 backdrop-blur-sm">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto bg-background/50">
                <TabsTrigger value="profile" className="text-xs sm:text-sm font-bold py-3 data-[state=active]:glow-accent gap-2">
                  <User size={16} weight="bold" className="hidden sm:inline" />
                  PROFILE
                </TabsTrigger>
                <TabsTrigger value="graphics" className="text-xs sm:text-sm font-bold py-3 data-[state=active]:glow-accent gap-2">
                  <Monitor size={16} weight="bold" className="hidden sm:inline" />
                  GRAPHICS
                </TabsTrigger>
                <TabsTrigger value="audio" className="text-xs sm:text-sm font-bold py-3 data-[state=active]:glow-accent gap-2">
                  <SpeakerHigh size={16} weight="bold" className="hidden sm:inline" />
                  AUDIO
                </TabsTrigger>
                <TabsTrigger value="controls" className="text-xs sm:text-sm font-bold py-3 data-[state=active]:glow-accent gap-2">
                  <GameController size={16} weight="bold" className="hidden sm:inline" />
                  CONTROLS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <Label htmlFor="player-name" className="text-primary font-black text-base tracking-wide">PLAYER NAME</Label>
                    <Input
                      id="player-name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                      className="glow-border font-black text-lg h-12 tracking-wider bg-background/50"
                      maxLength={16}
                      placeholder="ENTER CALLSIGN"
                    />
                    <p className="text-xs text-muted-foreground tracking-wide">3-16 CHARACTERS • UPPERCASE</p>
                  </div>

                  <div className="p-6 bg-card/60 rounded-lg glow-border">
                    <h3 className="font-black text-primary mb-4 text-lg tracking-wide flex items-center gap-2">
                      <span className="w-1 h-6 bg-accent"></span>
                      PLAYER IDENTITY
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center p-3 bg-background/40 rounded">
                        <span className="text-muted-foreground font-bold">CALLSIGN</span>
                        <span className="font-black text-accent">{playerName}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-background/40 rounded">
                        <span className="text-muted-foreground font-bold">RANK</span>
                        <span className="font-black text-primary">SERGEANT</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-background/40 rounded">
                        <span className="text-muted-foreground font-bold">COMBAT RATING</span>
                        <span className="font-black text-foreground">1250</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="graphics" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label className="text-primary font-black text-base tracking-wide">GRAPHICS QUALITY</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['low', 'medium', 'high', 'ultra'].map((quality) => (
                        <Button
                          key={quality}
                          onClick={() => setGraphicsQuality(quality)}
                          variant={graphicsQuality === quality ? 'default' : 'outline'}
                          className={`
                            text-sm font-black h-14 
                            ${graphicsQuality === quality ? 'glow-accent bg-accent/20 border-accent' : 'glow-border bg-card/60'}
                            hover:scale-105 transition-all duration-200
                          `}
                        >
                          {quality.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-card/60 rounded-lg glow-border hover:bg-card/80 transition-colors">
                    <div>
                      <Label htmlFor="show-fps" className="font-black text-base tracking-wide cursor-pointer">SHOW FPS COUNTER</Label>
                      <p className="text-xs text-muted-foreground mt-1">Display frame rate on screen</p>
                    </div>
                    <Switch
                      id="show-fps"
                      checked={showFPS}
                      onCheckedChange={setShowFPS}
                      className="data-[state=checked]:bg-accent"
                    />
                  </div>

                  <div className="flex items-center justify-between p-5 bg-card/60 rounded-lg glow-border hover:bg-card/80 transition-colors">
                    <div>
                      <Label htmlFor="vsync" className="font-black text-base tracking-wide cursor-pointer">V-SYNC</Label>
                      <p className="text-xs text-muted-foreground mt-1">Synchronize with monitor refresh rate</p>
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

              <TabsContent value="audio" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4 p-6 bg-card/60 rounded-lg glow-border">
                    <Label className="text-primary font-black text-base tracking-wide">MASTER VOLUME</Label>
                    <div className="flex items-center gap-6">
                      <Slider
                        value={masterVolume}
                        onValueChange={setMasterVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[80px] justify-end">
                        <span className="font-black text-accent text-2xl tabular-nums">{masterVolume?.[0] ?? 75}</span>
                        <span className="text-muted-foreground text-sm">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-6 bg-card/60 rounded-lg glow-border">
                    <Label className="text-primary font-black text-base tracking-wide">MUSIC VOLUME</Label>
                    <div className="flex items-center gap-6">
                      <Slider
                        value={musicVolume}
                        onValueChange={setMusicVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[80px] justify-end">
                        <span className="font-black text-accent text-2xl tabular-nums">{musicVolume?.[0] ?? 60}</span>
                        <span className="text-muted-foreground text-sm">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-6 bg-card/60 rounded-lg glow-border">
                    <Label className="text-primary font-black text-base tracking-wide">EFFECTS VOLUME</Label>
                    <div className="flex items-center gap-6">
                      <Slider
                        value={sfxVolume}
                        onValueChange={setSfxVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[80px] justify-end">
                        <span className="font-black text-accent text-2xl tabular-nums">{sfxVolume?.[0] ?? 80}</span>
                        <span className="text-muted-foreground text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="controls" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4 p-6 bg-card/60 rounded-lg glow-border">
                    <Label className="text-primary font-black text-base tracking-wide">MOUSE SENSITIVITY</Label>
                    <div className="flex items-center gap-6">
                      <Slider
                        value={mouseSensitivity}
                        onValueChange={setMouseSensitivity}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[80px] justify-end">
                        <span className="font-black text-accent text-2xl tabular-nums">{mouseSensitivity?.[0] ?? 50}</span>
                        <span className="text-muted-foreground text-sm">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-card/60 rounded-lg glow-border">
                    <h3 className="font-black text-primary mb-5 text-lg tracking-wide flex items-center gap-2">
                      <span className="w-1 h-6 bg-accent"></span>
                      KEY BINDINGS
                    </h3>
                    <div className="space-y-2">
                      {[
                        { action: 'MOVE FORWARD', key: 'W' },
                        { action: 'MOVE BACKWARD', key: 'S' },
                        { action: 'STRAFE LEFT', key: 'A' },
                        { action: 'STRAFE RIGHT', key: 'D' },
                        { action: 'JUMP', key: 'SPACE' },
                        { action: 'FIRE', key: 'MOUSE 1' },
                      ].map((bind, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-background/40 rounded hover:bg-background/60 transition-colors">
                          <span className="text-muted-foreground font-bold text-sm">{bind.action}</span>
                          <span className="font-black bg-primary/20 text-primary px-4 py-1.5 rounded text-sm border border-primary/30">
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
              className="mt-8 pt-8 border-t border-border/50 flex justify-end"
            >
              <Button
                onClick={handleRestoreDefaults}
                variant="outline"
                className="glow-border w-full sm:w-auto h-12 px-8 font-black hover:scale-105 transition-transform"
              >
                <ArrowCounterClockwise size={20} weight="bold" className="mr-2" />
                RESTORE DEFAULTS
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
