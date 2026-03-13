# Larafast Architecture

Larafast, Laravel projelerinin kurulum sürecini hızlandırmak için geliştirilmiş modüler bir CLI aracıdır.

Amaç, geliştiricilerin Laravel kurulumunda tekrar eden işlemleri otomatikleştirmek ve tek komutla hazır bir proje oluşturabilmektir.

---

# Core Principles

Larafast aşağıdaki prensiplerle tasarlanmıştır:

- Modüler kurulum sistemi
- Dependency kontrolü
- Çakışma önleme
- Environment doğrulama
- Stabil kurulum süreci

Her kurulum adımı doğrulanarak ilerler.

Örneğin:

Database bağlantısı kurulmadan migration çalıştırılmaz.

---

# System Layers

Larafast mimarisi aşağıdaki katmanlardan oluşur.

CLI Layer  
Command Layer  
Core Engine  
Module System  
Service Layer

---

# CLI Layer

CLI Layer terminalden gelen komutları yakalar.

Örnek komutlar:

larafast new project

larafast doctor

larafast install filament

larafast list

Bu katman komutları ilgili command handler'a yönlendirir.

---

# Command Layer

Her CLI komutu ayrı bir command olarak tanımlanır.

Örnek:

new command  
doctor command  
install command  

Command layer kullanıcı inputlarını alır ve Core Engine'e iletir.

---

# Core Engine

Core Engine Larafast'ın kurulum motorudur.

Görevleri:

- modülleri yönetmek
- dependency kontrolü yapmak
- kurulum sırasını belirlemek
- hata yönetimini sağlamak

---

# Module System

Larafast modüler bir yapıya sahiptir.

Her özellik bir modül olarak tanımlanır.

Örnek modüller:

Laravel install  
Database setup  
Breeze install  
Tailwind setup  
Docker setup  
Filament install  
Voyager install  

Her modül bağımsız çalışabilir.

---

# Dependency Management

Bazı modüller diğer modüllere bağımlıdır.

Örnek:

Breeze modülü Laravel kurulu olmadan çalışamaz.

Database migrate işlemi database bağlantısı kurulmadan çalıştırılmaz.

Larafast bu bağımlılıkları otomatik olarak yönetir.

---

# Conflict Detection

Bazı paketler birlikte kullanılamaz.

Örnek:

Breeze + Jetstream aynı anda kurulamaz.

Filament + Voyager aynı anda kurulamaz.

Larafast bu çakışmaları tespit eder ve kullanıcıyı uyarır.

---

# Installation Flow

Standart kurulum akışı:

Environment check

Laravel install

Environment setup

Database setup

Package installation

Frontend build

Migration run

Optimize

---

# Future Goals

Larafast ileride aşağıdaki özellikleri destekleyecektir:

Preset project templates  
Plugin sistemi  
Custom module geliştirme  
Remote module registry

---

Larafast hedefi Laravel kurulumunu saniyeler içinde stabil şekilde tamamlayan bir CLI aracı olmaktır.