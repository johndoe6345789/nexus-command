import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Monitor, SpeakerHigh, GameController, User } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'

interface SettingsProps {
  onBack: () => void
}

export function Settings({ onBack }: SettingsProps) {
  const [graphicsQuality, setGraphicsQuality] = useKV<string>('graphics-quality', 'high')
  const [masterVolume, setMasterVolume] = useKV<number>('master-volume', 80)
  const [musicVolume, setMusicVolume] = useKV<number>('music-volume', 60)
  const [sfxVolume, setSfxVolume] = useKV<number>('sfx-volume', 90)
  const [mouseSensitivity, setMouseSensitivity] = useKV<number>('mouse-sensitivity', 50)
  const [invertY, setInvertY] = useKV<boolean>('invert-y', false)
  const [playerName, setPlayerName] = useKV<string>('player-name', 'Operator')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-secondary/50"
          >
            <ArrowLeft className="mr-2" size={20} weight="bold" />
            Back to Menu
          </Button>

          <h1 className="text-6xl font-black tracking-tight mb-4">Settings</h1>
          <p className="text-muted-foreground text-lg">
            Configure your experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="graphics" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-16 mb-8 glass-panel">
              <TabsTrigger value="graphics" className="text-lg">
                <Monitor className="mr-2" size={20} weight="bold" />
                Graphics
              </TabsTrigger>
              <TabsTrigger value="audio" className="text-lg">
                <SpeakerHigh className="mr-2" size={20} weight="bold" />
                Audio
              </TabsTrigger>
              <TabsTrigger value="controls" className="text-lg">
                <GameController className="mr-2" size={20} weight="bold" />
                Controls
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-lg">
                <User className="mr-2" size={20} weight="bold" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="graphics" className="space-y-6">
              <Card className="p-8 glass-panel">
                <h2 className="text-2xl font-bold mb-6">Visual Settings</h2>
                <div className="space-y-8">
                  <div>
                    <Label className="text-lg mb-4 block">Graphics Quality</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {['low', 'medium', 'high', 'ultra'].map((quality) => (
                        <Button
                          key={quality}
                          variant={graphicsQuality === quality ? 'default' : 'outline'}
                          className="h-14 text-base"
                          onClick={() => setGraphicsQuality(quality)}
                        >
                          {quality.charAt(0).toUpperCase() + quality.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg">V-Sync</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-lg">Anti-Aliasing</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-lg">Motion Blur</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="audio" className="space-y-6">
              <Card className="p-8 glass-panel">
                <h2 className="text-2xl font-bold mb-6">Audio Settings</h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-lg">Master Volume</Label>
                      <span className="text-muted-foreground">{masterVolume}%</span>
                    </div>
                    <Slider
                      value={[masterVolume ?? 80]}
                      onValueChange={(value) => setMasterVolume(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-lg">Music Volume</Label>
                      <span className="text-muted-foreground">{musicVolume}%</span>
                    </div>
                    <Slider
                      value={[musicVolume ?? 60]}
                      onValueChange={(value) => setMusicVolume(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-lg">SFX Volume</Label>
                      <span className="text-muted-foreground">{sfxVolume}%</span>
                    </div>
                    <Slider
                      value={[sfxVolume ?? 90]}
                      onValueChange={(value) => setSfxVolume(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="controls" className="space-y-6">
              <Card className="p-8 glass-panel">
                <h2 className="text-2xl font-bold mb-6">Control Settings</h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-lg">Mouse Sensitivity</Label>
                      <span className="text-muted-foreground">{mouseSensitivity}%</span>
                    </div>
                    <Slider
                      value={[mouseSensitivity ?? 50]}
                      onValueChange={(value) => setMouseSensitivity(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-lg">Invert Y-Axis</Label>
                    <Switch
                      checked={invertY}
                      onCheckedChange={setInvertY}
                    />
                  </div>

                  <div className="pt-6 border-t border-border">
                    <Button variant="outline" size="lg" className="w-full">
                      Customize Key Bindings
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="p-8 glass-panel">
                <h2 className="text-2xl font-bold mb-6">Player Profile</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="player-name" className="text-lg mb-3 block">
                      Display Name
                    </Label>
                    <Input
                      id="player-name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="h-14 text-lg glass-panel"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="pt-6 border-t border-border space-y-4">
                    <Button variant="outline" size="lg" className="w-full">
                      Change Avatar
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Manage Account
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
