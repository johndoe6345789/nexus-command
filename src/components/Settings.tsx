import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft } from '@phosphor-icons/react'
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
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black glow-text mb-2">SETTINGS</h1>
            <p className="text-muted-foreground font-body tracking-wider">CONFIGURE SYSTEM PARAMETERS</p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="glow-border"
          >
            <ArrowLeft size={20} weight="bold" className="mr-2" />
            BACK
          </Button>
        </div>

        <Card className="p-6 glow-border">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="profile">PROFILE</TabsTrigger>
              <TabsTrigger value="graphics">GRAPHICS</TabsTrigger>
              <TabsTrigger value="audio">AUDIO</TabsTrigger>
              <TabsTrigger value="controls">CONTROLS</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="player-name" className="text-primary font-bold">PLAYER NAME</Label>
                  <Input
                    id="player-name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="glow-border font-bold"
                    maxLength={16}
                  />
                  <p className="text-xs text-muted-foreground">3-16 characters</p>
                </div>

                <div className="p-4 bg-card rounded glow-border">
                  <h3 className="font-bold text-primary mb-2">PLAYER IDENTITY</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>CALLSIGN: {playerName}</p>
                    <p>RANK: SERGEANT</p>
                    <p>COMBAT RATING: 1250</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="graphics" className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-primary font-bold">GRAPHICS QUALITY</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['low', 'medium', 'high', 'ultra'].map((quality) => (
                      <Button
                        key={quality}
                        onClick={() => setGraphicsQuality(quality)}
                        variant={graphicsQuality === quality ? 'default' : 'outline'}
                        className={graphicsQuality === quality ? 'glow-accent' : 'glow-border'}
                      >
                        {quality.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded glow-border">
                  <div>
                    <Label htmlFor="show-fps" className="font-bold">SHOW FPS COUNTER</Label>
                    <p className="text-xs text-muted-foreground">Display frame rate on screen</p>
                  </div>
                  <Switch
                    id="show-fps"
                    checked={showFPS}
                    onCheckedChange={setShowFPS}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded glow-border">
                  <div>
                    <Label htmlFor="vsync" className="font-bold">V-SYNC</Label>
                    <p className="text-xs text-muted-foreground">Synchronize with monitor refresh rate</p>
                  </div>
                  <Switch
                    id="vsync"
                    checked={vsync}
                    onCheckedChange={setVsync}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-primary font-bold">MASTER VOLUME</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={masterVolume}
                      onValueChange={setMasterVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="font-bold text-primary w-12 text-right tabular-nums">{masterVolume?.[0] ?? 75}%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-primary font-bold">MUSIC VOLUME</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={musicVolume}
                      onValueChange={setMusicVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="font-bold text-primary w-12 text-right tabular-nums">{musicVolume?.[0] ?? 60}%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-primary font-bold">EFFECTS VOLUME</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={sfxVolume}
                      onValueChange={setSfxVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="font-bold text-primary w-12 text-right tabular-nums">{sfxVolume?.[0] ?? 80}%</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-primary font-bold">MOUSE SENSITIVITY</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={mouseSensitivity}
                      onValueChange={setMouseSensitivity}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="font-bold text-primary w-12 text-right tabular-nums">{mouseSensitivity?.[0] ?? 50}%</span>
                  </div>
                </div>

                <div className="p-4 bg-card rounded glow-border">
                  <h3 className="font-bold text-primary mb-4">KEY BINDINGS</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MOVE FORWARD</span>
                      <span className="font-bold">W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MOVE BACKWARD</span>
                      <span className="font-bold">S</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">STRAFE LEFT</span>
                      <span className="font-bold">A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">STRAFE RIGHT</span>
                      <span className="font-bold">D</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">JUMP</span>
                      <span className="font-bold">SPACE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">FIRE</span>
                      <span className="font-bold">MOUSE 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t border-border flex justify-end">
            <Button
              onClick={handleRestoreDefaults}
              variant="outline"
              className="glow-border"
            >
              RESTORE DEFAULTS
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
