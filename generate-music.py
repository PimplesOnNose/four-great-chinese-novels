#!/usr/bin/env python3
"""
Generate MIDI soundtracks for the Four Great Chinese Novels
Traditional Chinese pentatonic scales with appropriate moods
"""

import os
from midiutil import MIDIFile

# Output directory
OUTPUT_DIR = "audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Traditional Chinese Pentatonic Scales (MIDI note numbers)
# Gong (宫) = C, Shang (商) = D, Jue (角) = E, Zhi (徵) = G, Yu (羽) = A
PENTATONIC = {
    'C': [60, 62, 64, 67, 69, 72, 74, 76, 79, 81],  # C major pentatonic
    'D': [62, 64, 67, 69, 72, 74, 76, 79, 81, 84],  # D major pentatonic
    'E': [64, 67, 69, 72, 74, 76, 79, 81, 84, 88],  # E major pentatonic
    'G': [55, 57, 59, 62, 64, 67, 69, 71, 74, 76],  # G major pentatonic
    'A': [57, 59, 62, 64, 67, 69, 71, 74, 76, 79],  # A major pentatonic
}

# Minor pentatonic for more somber tones
PENTATONIC_MINOR = {
    'Am': [57, 60, 62, 64, 67, 69, 72, 74, 76, 79],
    'Dm': [62, 65, 67, 69, 72, 74, 77, 79, 81, 84],
    'Em': [64, 67, 69, 71, 74, 76, 79, 81, 83, 86],
}

def create_midi(filename, tempo, tracks_data):
    """Create a MIDI file with multiple tracks"""
    midi = MIDIFile(len(tracks_data))
    
    for track_num, track in enumerate(tracks_data):
        midi.addTrackName(track_num, 0, track['name'])
        midi.addTempo(track_num, 0, tempo)
        
        # Add instrument (program change)
        midi.addProgramChange(track_num, 0, 0, track.get('instrument', 0))
        
        # Add notes
        time = track.get('start_time', 0)
        for note_data in track['notes']:
            if isinstance(note_data, tuple):
                pitch, duration, volume = note_data
            elif isinstance(note_data, dict):
                pitch = note_data['pitch']
                duration = note_data.get('duration', 1)
                volume = note_data.get('volume', 80)
            else:
                pitch = note_data
                duration = 1
                volume = 80
            
            if pitch is not None:  # None = rest
                midi.addNote(track_num, 0, pitch, time, duration, volume)
            time += duration
    
    # Write to file
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "wb") as f:
        midi.writeFile(f)
    print(f"✓ Generated {filepath}")
    return filepath


def generate_landing():
    """Landing page - Ethereal, welcoming, mysterious"""
    tempo = 60  # Slow, contemplative
    
    scale = PENTATONIC['C']
    
    # Pad/drone track - low sustained notes
    pad_notes = [
        {'pitch': 48, 'duration': 4, 'volume': 40},  # C3
        {'pitch': 55, 'duration': 4, 'volume': 35},  # G3
        {'pitch': 48, 'duration': 4, 'volume': 40},
        {'pitch': 52, 'duration': 4, 'volume': 35},  # E3
        {'pitch': 48, 'duration': 4, 'volume': 40},
        {'pitch': 55, 'duration': 4, 'volume': 35},
        {'pitch': 52, 'duration': 4, 'volume': 35},
        {'pitch': 48, 'duration': 4, 'volume': 40},
    ]
    
    # Melody - sparse, guzheng-like
    melody_notes = [
        None, None, None, None,
        {'pitch': 72, 'duration': 2, 'volume': 60},  # C5
        None,
        {'pitch': 76, 'duration': 1, 'volume': 55},  # E5
        {'pitch': 74, 'duration': 1, 'volume': 50},  # D5
        {'pitch': 72, 'duration': 2, 'volume': 60},
        None, None,
        {'pitch': 79, 'duration': 2, 'volume': 55},  # G5
        {'pitch': 76, 'duration': 1, 'volume': 50},
        {'pitch': 74, 'duration': 1, 'volume': 50},
        {'pitch': 72, 'duration': 2, 'volume': 60},
        None, None, None, None,
        {'pitch': 69, 'duration': 2, 'volume': 55},  # A4
        {'pitch': 72, 'duration': 1, 'volume': 50},
        {'pitch': 74, 'duration': 1, 'volume': 55},
        {'pitch': 76, 'duration': 2, 'volume': 60},
        None,
        {'pitch': 74, 'duration': 1, 'volume': 50},
        {'pitch': 72, 'duration': 2, 'volume': 55},
        None, None, None, None,
    ]
    
    # High bell-like accents
    bell_notes = [
        None, None,
        {'pitch': 84, 'duration': 0.5, 'volume': 30},  # C6
        None, None, None, None, None,
        None, None,
        {'pitch': 88, 'duration': 0.5, 'volume': 25},  # E6
        None, None, None, None, None,
        None, None,
        {'pitch': 84, 'duration': 0.5, 'volume': 30},
        None, None, None, None, None,
        None, None,
        {'pitch': 81, 'duration': 0.5, 'volume': 25},  # A5
        None, None, None, None, None,
    ]
    
    tracks = [
        {'name': 'Pad', 'instrument': 48, 'notes': pad_notes, 'start_time': 0},
        {'name': 'Guzheng Melody', 'instrument': 107, 'notes': melody_notes, 'start_time': 0},
        {'name': 'Bells', 'instrument': 14, 'notes': bell_notes, 'start_time': 0},
    ]
    
    return create_midi("landing.mp3", tempo, tracks)


def generate_three_kingdoms():
    """Three Kingdoms - Grand, strategic, water element"""
    tempo = 72  # Moderate, purposeful
    
    # Deep bass - strategic foundation
    bass_notes = [
        {'pitch': 36, 'duration': 2, 'volume': 60},  # C2
        {'pitch': 43, 'duration': 2, 'volume': 55},  # G2
        {'pitch': 38, 'duration': 2, 'volume': 55},  # D2
        {'pitch': 43, 'duration': 2, 'volume': 55},
        {'pitch': 36, 'duration': 2, 'volume': 60},
        {'pitch': 40, 'duration': 2, 'volume': 55},  # E2
        {'pitch': 38, 'duration': 2, 'volume': 55},
        {'pitch': 43, 'duration': 2, 'volume': 55},
    ]
    
    # Guzheng melody - flowing like water
    scale = PENTATONIC['G']
    melody_notes = [
        {'pitch': 67, 'duration': 1, 'volume': 70},  # G4
        {'pitch': 71, 'duration': 1, 'volume': 65},  # B4
        {'pitch': 74, 'duration': 1.5, 'volume': 70},  # D5
        {'pitch': 72, 'duration': 0.5, 'volume': 60},
        {'pitch': 69, 'duration': 1, 'volume': 65},  # A4
        {'pitch': 67, 'duration': 1, 'volume': 70},
        {'pitch': 74, 'duration': 2, 'volume': 75},
        {'pitch': 71, 'duration': 1, 'volume': 65},
        {'pitch': 69, 'duration': 1, 'volume': 65},
        {'pitch': 67, 'duration': 1.5, 'volume': 70},
        {'pitch': 64, 'duration': 0.5, 'volume': 60},  # E4
        {'pitch': 62, 'duration': 1, 'volume': 65},  # D4
        {'pitch': 67, 'duration': 2, 'volume': 70},
        None,
        {'pitch': 76, 'duration': 1, 'volume': 70},  # E5
        {'pitch': 74, 'duration': 1, 'volume': 65},
        {'pitch': 71, 'duration': 1, 'volume': 70},
        {'pitch': 69, 'duration': 1, 'volume': 65},
        {'pitch': 67, 'duration': 2, 'volume': 70},
    ]
    
    # Erhu-like sustained notes
    erhu_notes = [
        None, None, None, None,
        {'pitch': 79, 'duration': 2, 'volume': 45},  # G5
        {'pitch': 76, 'duration': 2, 'volume': 40},
        {'pitch': 74, 'duration': 2, 'volume': 45},
        {'pitch': 71, 'duration': 2, 'volume': 40},
        None, None, None, None,
        {'pitch': 76, 'duration': 2, 'volume': 45},
        {'pitch': 74, 'duration': 2, 'volume': 40},
        {'pitch': 71, 'duration': 2, 'volume': 45},
        {'pitch': 67, 'duration': 2, 'volume': 40},
    ]
    
    tracks = [
        {'name': 'Bass', 'instrument': 42, 'notes': bass_notes, 'start_time': 0},
        {'name': 'Guzheng', 'instrument': 107, 'notes': melody_notes, 'start_time': 0},
        {'name': 'Erhu', 'instrument': 110, 'notes': erhu_notes, 'start_time': 0},
    ]
    
    return create_midi("three-kingdoms.mp3", tempo, tracks)


def generate_water_margin():
    """Water Margin - Bold, heroic, earth element"""
    tempo = 80  # March-like, determined
    
    # Strong bass foundation
    bass_notes = [
        {'pitch': 38, 'duration': 1, 'volume': 75},  # D2
        {'pitch': 38, 'duration': 1, 'volume': 65},
        {'pitch': 45, 'duration': 1, 'volume': 70},  # A2
        {'pitch': 38, 'duration': 1, 'volume': 65},
        {'pitch': 43, 'duration': 1, 'volume': 70},  # G2
        {'pitch': 43, 'duration': 1, 'volume': 65},
        {'pitch': 45, 'duration': 1, 'volume': 70},
        {'pitch': 38, 'duration': 1, 'volume': 75},
    ]
    
    # Pipa melody - bold and rhythmic
    scale = PENTATONIC['D']
    melody_notes = [
        {'pitch': 74, 'duration': 0.5, 'volume': 80},  # D5
        {'pitch': 74, 'duration': 0.5, 'volume': 70},
        {'pitch': 76, 'duration': 0.5, 'volume': 75},  # E5
        {'pitch': 79, 'duration': 0.5, 'volume': 80},  # G5
        {'pitch': 81, 'duration': 1, 'volume': 85},  # A5
        {'pitch': 79, 'duration': 0.5, 'volume': 75},
        {'pitch': 76, 'duration': 0.5, 'volume': 70},
        {'pitch': 74, 'duration': 1, 'volume': 80},
        {'pitch': 72, 'duration': 1, 'volume': 75},  # C5
        {'pitch': 69, 'duration': 1, 'volume': 70},  # A4
        {'pitch': 74, 'duration': 2, 'volume': 80},
        None,
        {'pitch': 81, 'duration': 0.5, 'volume': 80},
        {'pitch': 79, 'duration': 0.5, 'volume': 75},
        {'pitch': 76, 'duration': 0.5, 'volume': 70},
        {'pitch': 74, 'duration': 0.5, 'volume': 75},
        {'pitch': 72, 'duration': 1, 'volume': 80},
        {'pitch': 69, 'duration': 1, 'volume': 75},
        {'pitch': 67, 'duration': 1, 'volume': 70},  # G4
        {'pitch': 74, 'duration': 1, 'volume': 80},
    ]
    
    # Percussion-like accents
    perc_notes = [
        {'pitch': 60, 'duration': 0.25, 'volume': 60},  # C4
        None, None, None,
        {'pitch': 60, 'duration': 0.25, 'volume': 55},
        None, None, None,
        {'pitch': 60, 'duration': 0.25, 'volume': 60},
        None, None, None,
        {'pitch': 60, 'duration': 0.25, 'volume': 55},
        None, None, None,
        {'pitch': 60, 'duration': 0.25, 'volume': 60},
        None, None, None,
        {'pitch': 60, 'duration': 0.25, 'volume': 55},
        None, None, None,
    ]
    
    tracks = [
        {'name': 'Bass', 'instrument': 42, 'notes': bass_notes, 'start_time': 0},
        {'name': 'Pipa', 'instrument': 105, 'notes': melody_notes, 'start_time': 0},
        {'name': 'Percussion', 'instrument': 115, 'notes': perc_notes, 'start_time': 0},
    ]
    
    return create_midi("water-margin.mp3", tempo, tracks)


def generate_journey_west():
    """Journey to the West - Playful, mystical, fire element"""
    tempo = 90  # Lively, adventurous
    
    # Bouncy bass
    bass_notes = [
        {'pitch': 48, 'duration': 0.5, 'volume': 65},  # C3
        None,
        {'pitch': 48, 'duration': 0.5, 'volume': 55},
        {'pitch': 55, 'duration': 0.5, 'volume': 65},  # G3
        None,
        {'pitch': 55, 'duration': 0.5, 'volume': 55},
        {'pitch': 52, 'duration': 0.5, 'volume': 60},  # E3
        None,
        {'pitch': 52, 'duration': 0.5, 'volume': 55},
        {'pitch': 55, 'duration': 0.5, 'volume': 60},
        None,
        {'pitch': 57, 'duration': 0.5, 'volume': 65},  # A3
        None, None,
        {'pitch': 55, 'duration': 0.5, 'volume': 60},
        {'pitch': 52, 'duration': 0.5, 'volume': 55},
    ]
    
    # Playful flute melody
    melody_notes = [
        {'pitch': 72, 'duration': 0.5, 'volume': 75},  # C5
        {'pitch': 76, 'duration': 0.5, 'volume': 80},  # E5
        {'pitch': 79, 'duration': 0.5, 'volume': 85},  # G5
        {'pitch': 84, 'duration': 0.5, 'volume': 80},  # C6
        {'pitch': 79, 'duration': 0.5, 'volume': 75},
        {'pitch': 76, 'duration': 0.5, 'volume': 70},
        {'pitch': 72, 'duration': 1, 'volume': 75},
        None,
        {'pitch': 74, 'duration': 0.5, 'volume': 75},  # D5
        {'pitch': 77, 'duration': 0.5, 'volume': 80},  # F5
        {'pitch': 81, 'duration': 0.5, 'volume': 85},  # A5
        {'pitch': 84, 'duration': 0.5, 'volume': 80},
        {'pitch': 81, 'duration': 0.5, 'volume': 75},
        {'pitch': 77, 'duration': 0.5, 'volume': 70},
        {'pitch': 74, 'duration': 1, 'volume': 75},
        None,
        {'pitch': 79, 'duration': 0.5, 'volume': 80},  # G5
        {'pitch': 84, 'duration': 0.5, 'volume': 85},
        {'pitch': 88, 'duration': 1, 'volume': 80},  # E6
        {'pitch': 84, 'duration': 0.5, 'volume': 75},
        {'pitch': 79, 'duration': 0.5, 'volume': 70},
        {'pitch': 76, 'duration': 1, 'volume': 75},
        None,
    ]
    
    # Mystical high notes
    mystic_notes = [
        None, None, None,
        {'pitch': 96, 'duration': 0.25, 'volume': 40},  # C7
        None, None, None, None,
        None, None, None,
        {'pitch': 93, 'duration': 0.25, 'volume': 35},  # A6
        None, None, None, None,
        None, None, None,
        {'pitch': 91, 'duration': 0.25, 'volume': 40},  # G6
        None, None, None, None,
    ]
    
    tracks = [
        {'name': 'Bass', 'instrument': 42, 'notes': bass_notes, 'start_time': 0},
        {'name': 'Dizi Flute', 'instrument': 73, 'notes': melody_notes, 'start_time': 0},
        {'name': 'Mystic Bells', 'instrument': 14, 'notes': mystic_notes, 'start_time': 0},
    ]
    
    return create_midi("journey-west.mp3", tempo, tracks)


def generate_red_chamber():
    """Dream of the Red Chamber - Elegant, melancholy, wood element"""
    tempo = 54  # Slow, contemplative
    
    # Gentle guqin bass
    bass_notes = [
        {'pitch': 48, 'duration': 4, 'volume': 45},  # C3
        {'pitch': 55, 'duration': 4, 'volume': 40},  # G3
        {'pitch': 52, 'duration': 4, 'volume': 40},  # E3
        {'pitch': 57, 'duration': 4, 'volume': 40},  # A3
    ]
    
    # Melancholy erhu melody
    scale = PENTATONIC_MINOR['Am']
    melody_notes = [
        {'pitch': 69, 'duration': 2, 'volume': 65},  # A4
        {'pitch': 72, 'duration': 1, 'volume': 60},  # C5
        {'pitch': 74, 'duration': 1, 'volume': 65},  # D5
        {'pitch': 72, 'duration': 2, 'volume': 60},
        {'pitch': 69, 'duration': 2, 'volume': 65},
        {'pitch': 64, 'duration': 2, 'volume': 60},  # E4
        {'pitch': 67, 'duration': 1, 'volume': 60},  # G4
        {'pitch': 69, 'duration': 1, 'volume': 65},
        {'pitch': 72, 'duration': 3, 'volume': 65},
        None,
        {'pitch': 76, 'duration': 1, 'volume': 60},  # E5
        {'pitch': 74, 'duration': 1, 'volume': 55},
        {'pitch': 72, 'duration': 1, 'volume': 60},
        {'pitch': 69, 'duration': 1, 'volume': 55},
        {'pitch': 67, 'duration': 2, 'volume': 60},
        {'pitch': 64, 'duration': 2, 'volume': 55},
    ]
    
    # Soft string accompaniment
    strings_notes = [
        {'pitch': 60, 'duration': 2, 'volume': 35},  # C4
        {'pitch': 64, 'duration': 2, 'volume': 30},  # E4
        {'pitch': 67, 'duration': 2, 'volume': 35},  # G4
        {'pitch': 69, 'duration': 2, 'volume': 30},  # A4
        {'pitch': 60, 'duration': 2, 'volume': 35},
        {'pitch': 64, 'duration': 2, 'volume': 30},
        {'pitch': 67, 'duration': 2, 'volume': 35},
        {'pitch': 69, 'duration': 2, 'volume': 30},
    ]
    
    # Delicate harp-like arpeggios
    harp_notes = [
        {'pitch': 72, 'duration': 0.5, 'volume': 40},
        {'pitch': 76, 'duration': 0.5, 'volume': 35},
        {'pitch': 79, 'duration': 0.5, 'volume': 40},
        {'pitch': 84, 'duration': 1, 'volume': 35},
        None, None, None,
        {'pitch': 69, 'duration': 0.5, 'volume': 40},
        {'pitch': 72, 'duration': 0.5, 'volume': 35},
        {'pitch': 76, 'duration': 0.5, 'volume': 40},
        {'pitch': 81, 'duration': 1, 'volume': 35},
        None, None, None,
    ]
    
    tracks = [
        {'name': 'Guqin Bass', 'instrument': 107, 'notes': bass_notes, 'start_time': 0},
        {'name': 'Erhu', 'instrument': 110, 'notes': melody_notes, 'start_time': 0},
        {'name': 'Strings', 'instrument': 48, 'notes': strings_notes, 'start_time': 0},
        {'name': 'Harp', 'instrument': 46, 'notes': harp_notes, 'start_time': 0},
    ]
    
    return create_midi("red-chamber.mp3", tempo, tracks)


if __name__ == "__main__":
    print("🎵 Generating Four Great Novels Soundtrack...\n")
    
    generate_landing()
    generate_three_kingdoms()
    generate_water_margin()
    generate_journey_west()
    generate_red_chamber()
    
    print(f"\n✅ All tracks generated in {OUTPUT_DIR}/")
    print("Files:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        if f.endswith('.mp3'):
            size = os.path.getsize(os.path.join(OUTPUT_DIR, f))
            print(f"  {f} ({size:,} bytes)")
